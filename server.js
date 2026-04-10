const express = require("express");
const path = require("path");
const crypto = require("crypto");
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const {
  DynamoDBDocumentClient,
  PutCommand,
  ScanCommand,
  DeleteCommand,
} = require("@aws-sdk/lib-dynamodb");

const app = express();
const port = Number(process.env.PORT) || 8080;
const buildDir = path.join(__dirname, "build");

app.use(express.json({ limit: "8mb" }));

const TABLE_NAME = process.env.STICKER_TABLE || "artdept-stickers";
const dynamo = DynamoDBDocumentClient.from(
  new DynamoDBClient({ region: process.env.AWS_REGION || "us-east-1" }),
);

console.log(`[DB] Using DynamoDB table: ${TABLE_NAME}`);

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

app.get("/api/checkin-stickers", async (request, response) => {
  try {
    const rawLimit = Number.parseInt(request.query.limit, 10);
    const limit = Number.isFinite(rawLimit)
      ? Math.max(1, Math.min(rawLimit, 500))
      : 24;
    const includePending = request.query.includePending === "1";

    const result = await dynamo.send(
      new ScanCommand({
        TableName: TABLE_NAME,
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

    const rows = (result.Items || [])
      .sort((a, b) => (b.createdAt > a.createdAt ? 1 : -1))
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

    return response.json({ success: true, id, moderationStatus: "approved" });
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

app.use(express.static(buildDir, { maxAge: "1h" }));

app.use((_request, response) => {
  response.sendFile(path.join(buildDir, "index.html"));
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
