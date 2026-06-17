const express = require("express");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const app = express();
const port = Number(process.env.PORT) || 3000;
const buildDir = path.join(__dirname, "build");

app.use(express.json({ limit: "8mb" }));

const TABLE_NAME = process.env.STICKER_TABLE || "artdept-stickers";
let dynamo = null;
let PutCommand;
let ScanCommand;
let DeleteCommand;

function getDynamo() {
  if (dynamo && PutCommand && ScanCommand && DeleteCommand) {
    return { dynamo, PutCommand, ScanCommand, DeleteCommand };
  }

  const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
  const dynamoLib = require("@aws-sdk/lib-dynamodb");

  dynamo = dynamoLib.DynamoDBDocumentClient.from(
    new DynamoDBClient({ region: process.env.AWS_REGION || "us-east-1" }),
  );
  PutCommand = dynamoLib.PutCommand;
  ScanCommand = dynamoLib.ScanCommand;
  DeleteCommand = dynamoLib.DeleteCommand;

  return { dynamo, PutCommand, ScanCommand, DeleteCommand };
}

console.log(`[DB] Using DynamoDB table: ${TABLE_NAME}`);

const gmailAppPassword = process.env.GMAIL_APP_PASSWORD || "";

async function sendStickerNotification(username, imageData, id, ip, userAgent) {
  if (!gmailAppPassword) {
    console.warn("[EMAIL] GMAIL_APP_PASSWORD not set — skipping notification");
    return;
  }
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: "mikesartdept@gmail.com", pass: gmailAppPassword },
    });
    const timestamp = new Date().toLocaleString("en-US", {
      timeZone: "America/New_York",
    });
    const base64 = imageData
      ? imageData.replace(/^data:image\/\w+;base64,/, "")
      : null;
    const mailOptions = {
      from: '"Mike\'s Art Dept" <mikesartdept@gmail.com>',
      to: "mikesartdept@gmail.com",
      subject: "Someone Just Said Hello!",
      html: `<p>A new Hello Sticker was just posted!</p>
<p>
  <strong>Username:</strong> ${username}<br>
  <strong>Time:</strong> ${timestamp} ET<br>
  <strong>Sticker ID:</strong> ${id}<br>
  <strong>IP:</strong> ${ip || "unknown"}<br>
  <strong>Device:</strong> ${userAgent || "unknown"}
</p>
${base64 ? '<img src="cid:sticker" style="max-width:400px;border:1px solid #ccc;" />' : ""}`,
      text: `A new Hello Sticker was just posted!\n\nUsername: ${username}\nTime: ${timestamp} ET\nSticker ID: ${id}\nIP: ${ip || "unknown"}\nDevice: ${userAgent || "unknown"}`,
    };
    if (base64) {
      mailOptions.attachments = [
        {
          filename: "sticker.png",
          content: base64,
          encoding: "base64",
          cid: "sticker",
        },
      ];
    }
    await transporter.sendMail(mailOptions);
    console.log("[EMAIL] Sticker notification sent");
  } catch (err) {
    console.error("[EMAIL] Failed to send notification:", err.message);
  }
}

const stickerAdminToken = process.env.STICKER_ADMIN_TOKEN || "";

const hasValidAdminToken = (request) => {
  const headerToken = request.get("x-sticker-admin-token") || "";
  const authHeader = request.get("authorization") || "";
  const bearerMatch = authHeader.match(/^Bearer\s+(.+)$/i);
  const bearerToken = bearerMatch ? bearerMatch[1] : "";
  const providedToken = headerToken || bearerToken;
  return Boolean(stickerAdminToken) && providedToken === stickerAdminToken;
};

app.get("/health", (_request, response) => {
  response.status(200).json({ status: "ok" });
});

// Proxy the Memorial Day sticker template from S3 to avoid cross-origin canvas taint.
const MEMORIAL_DAY_TEMPLATE_URL =
  "https://artdept-portfolio-test.s3.amazonaws.com/images/hero/helloStickerTemplate_memDay26.png";
app.get("/api/sticker-template/memday26", async (_request, response) => {
  try {
    const s3Response = await fetch(MEMORIAL_DAY_TEMPLATE_URL);
    if (!s3Response.ok) {
      return response
        .status(502)
        .json({ error: "Failed to fetch template from S3." });
    }
    const contentType = s3Response.headers.get("content-type") || "image/png";
    response.setHeader("Content-Type", contentType);
    response.setHeader("Cache-Control", "public, max-age=3600");
    const buffer = await s3Response.arrayBuffer();
    return response.end(Buffer.from(buffer));
  } catch (err) {
    console.error("[PROXY] Memorial Day template fetch failed:", err.message);
    return response.status(502).json({ error: "Template proxy error." });
  }
});

// Proxy the National Donut Day sticker template from S3 to avoid cross-origin canvas taint.
const DONUT_DAY_TEMPLATE_URL =
  "https://artdept-portfolio-test.s3.amazonaws.com/images/hero/helloStickerTemplate_donutDay26.png";
app.get("/api/sticker-template/donutday26", async (_request, response) => {
  try {
    const s3Response = await fetch(DONUT_DAY_TEMPLATE_URL);
    if (!s3Response.ok) {
      return response
        .status(502)
        .json({ error: "Failed to fetch template from S3." });
    }
    const contentType = s3Response.headers.get("content-type") || "image/png";
    response.setHeader("Content-Type", contentType);
    response.setHeader("Cache-Control", "public, max-age=3600");
    const buffer = await s3Response.arrayBuffer();
    return response.end(Buffer.from(buffer));
  } catch (err) {
    console.error("[PROXY] Donut Day template fetch failed:", err.message);
    return response.status(502).json({ error: "Template proxy error." });
  }
});

app.get("/api/checkin-stickers", async (request, response) => {
  try {
    const { dynamo, ScanCommand } = getDynamo();
    const rawLimit = Number.parseInt(request.query.limit, 10);
    const limit = Number.isFinite(rawLimit)
      ? Math.max(1, Math.min(rawLimit, 500))
      : 24;
    const includePending = request.query.includePending === "1";

    // DynamoDB Scan returns unordered paginated pages; a single page can miss
    // newly written items, which makes stickers appear to vanish after refresh.
    const scanItems = [];
    let exclusiveStartKey = undefined;
    let pageCount = 0;
    const maxPages = 50;

    do {
      const page = await dynamo.send(
        new ScanCommand({
          TableName: TABLE_NAME,
          ConsistentRead: true,
          ExclusiveStartKey: exclusiveStartKey,
          FilterExpression: includePending
            ? "moderationStatus IN (:a, :p)"
            : "moderationStatus = :a OR attribute_not_exists(moderationStatus)",
          ExpressionAttributeValues: includePending
            ? { ":a": "approved", ":p": "pending" }
            : { ":a": "approved" },
          ProjectionExpression:
            "id, username, imageData, createdAt, moderationStatus",
        }),
      );

      scanItems.push(...(page.Items || []));
      exclusiveStartKey = page.LastEvaluatedKey;
      pageCount += 1;
    } while (exclusiveStartKey && pageCount < maxPages);

    const createdAtTime = (item) => {
      const parsed = Date.parse(item?.createdAt || "");
      return Number.isFinite(parsed) ? parsed : 0;
    };

    const rows = scanItems
      .sort((a, b) => createdAtTime(b) - createdAtTime(a))
      .slice(0, limit);

    return response.json(rows);
  } catch (error) {
    console.error("[DB] Failed to list stickers:", error.message);
    return response.status(500).json({ error: "Database error" });
  }
});

app.post("/api/checkin-stickers", async (request, response) => {
  const { username, imageData } = request.body || {};
  if (!imageData || typeof imageData !== "string") {
    return response.status(400).json({ error: "Missing image data" });
  }

  try {
    const { dynamo, PutCommand } = getDynamo();
    const id = crypto.randomUUID();
    const createdAt = new Date().toISOString();
    await dynamo.send(
      new PutCommand({
        TableName: TABLE_NAME,
        Item: {
          id,
          username: username || "Anonymous",
          imageData,
          createdAt,
          moderationStatus: "approved",
        },
      }),
    );

    sendStickerNotification(
      username || "Anonymous",
      imageData,
      id,
      request.ip,
      request.get("user-agent"),
    );

    return response.json({
      success: true,
      id,
      moderationStatus: "approved",
      createdAt,
      username: username || "Anonymous",
    });
  } catch (error) {
    console.error("[DB] Failed to save sticker:", error.message);
    if (
      error?.name === "ValidationException" &&
      /item size|maximum allowed size/i.test(error.message || "")
    ) {
      return response.status(413).json({
        error:
          "Sticker image is too large to save. Please draw a bit less detail and try again.",
      });
    }
    return response.status(500).json({ error: "Database error" });
  }
});

app.delete("/api/admin/checkin-stickers", async (request, response) => {
  if (!stickerAdminToken) {
    return response
      .status(503)
      .json({ error: "Sticker admin token is not configured" });
  }

  if (!hasValidAdminToken(request)) {
    return response.status(401).json({ error: "Unauthorized" });
  }

  try {
    const { dynamo, ScanCommand, DeleteCommand } = getDynamo();
    // Scan all items then batch-delete them
    const scanResult = await dynamo.send(
      new ScanCommand({ TableName: TABLE_NAME, ProjectionExpression: "id" }),
    );
    const items = scanResult.Items || [];
    await Promise.all(
      items.map((item) =>
        dynamo.send(
          new DeleteCommand({ TableName: TABLE_NAME, Key: { id: item.id } }),
        ),
      ),
    );
    return response.json({ success: true, deletedCount: items.length });
  } catch (_error) {
    return response.status(500).json({ error: "Database error" });
  }
});

app.use("/api", (_request, response) => {
  response.status(404).json({ error: "Not found" });
});

const MEMORIAL_DAY_OG_IMAGE =
  "https://artdept-portfolio-test.s3.amazonaws.com/images/hero/helloStickerTemplate_memDay26.png";
const DONUT_DAY_OG_IMAGE =
  "https://artdept-portfolio-test.s3.amazonaws.com/images/hero/helloStickerTemplate_donutDay26.png";
const DEFAULT_OG_IMAGE =
  "https://artdept-portfolio-test.s3.amazonaws.com/images/hero/helloStickerTemplate.png";
const MEMORIAL_DAY_END = new Date("2026-05-26T00:00:00Z");
const DONUT_DAY_START = new Date("2026-06-05T00:00:00Z");
const DONUT_DAY_END = new Date("2026-06-06T12:00:00Z"); // noon UTC = midnight Hawaii (UTC-10)

function serveIndex(_request, response) {
  const indexPath = path.join(buildDir, "index.html");
  fs.readFile(indexPath, "utf8", (err, html) => {
    if (err) {
      return response.status(500).send("Server error");
    }
    const now = Date.now();
    let ogImage = DEFAULT_OG_IMAGE;
    if (now < MEMORIAL_DAY_END.getTime()) {
      ogImage = MEMORIAL_DAY_OG_IMAGE;
    } else if (
      now >= DONUT_DAY_START.getTime() &&
      now < DONUT_DAY_END.getTime()
    ) {
      ogImage = DONUT_DAY_OG_IMAGE;
    }
    const modified = html.split(DEFAULT_OG_IMAGE).join(ogImage);
    response.setHeader("Content-Type", "text/html");
    response.setHeader("Cache-Control", "no-store");
    response.send(modified);
  });
}

// Intercept /index.html before express.static so CloudFront's DefaultRootObject
// rewrite (/ → /index.html) still gets the dynamic OG image replacement.
app.get("/index.html", serveIndex);

app.use(express.static(buildDir, { maxAge: "1h", index: false }));

app.use(serveIndex);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
