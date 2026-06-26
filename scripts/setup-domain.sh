#!/usr/bin/env bash
# =============================================================================
#  setup-domain.sh  —  Full domain + SSL + CloudFront setup for mt_artdept_v1
#  Run: bash scripts/setup-domain.sh
# =============================================================================
set -euo pipefail

# ── colours ──────────────────────────────────────────────────────────────────
GREEN='\033[0;32m'; CYAN='\033[0;36m'; YELLOW='\033[1;33m'; RED='\033[0;31m'; NC='\033[0m'
info()    { echo -e "${CYAN}[info]${NC}  $*"; }
success() { echo -e "${GREEN}[done]${NC}  $*"; }
warn()    { echo -e "${YELLOW}[wait]${NC}  $*"; }
err()     { echo -e "${RED}[error]${NC} $*" >&2; exit 1; }
hr()      { echo -e "${CYAN}──────────────────────────────────────────────────${NC}"; }

EB_CNAME="Artdeptdemo-env.eba-vcb9pd44.us-east-1.elasticbeanstalk.com"
REGION="us-east-1"
STATE_FILE="$(dirname "$0")/.domain-setup-state"

# ── resume state ─────────────────────────────────────────────────────────────
DOMAIN=""
CERT_ARN=""
HOSTED_ZONE_ID=""
CF_DOMAIN=""
CF_ID=""

if [[ -f "$STATE_FILE" ]]; then
  source "$STATE_FILE"
  info "Resuming from saved state."
fi

save_state() {
  cat > "$STATE_FILE" <<EOF
DOMAIN="${DOMAIN}"
CERT_ARN="${CERT_ARN}"
HOSTED_ZONE_ID="${HOSTED_ZONE_ID}"
CF_DOMAIN="${CF_DOMAIN}"
CF_ID="${CF_ID}"
EOF
}

# =============================================================================
hr
echo -e "${CYAN}  Art Dept — Domain + SSL + CloudFront Setup${NC}"
hr

# ── STEP 1: Domain name ───────────────────────────────────────────────────────
if [[ -z "$DOMAIN" ]]; then
  echo ""
  warn "STEP 1 of 5 — What domain do you want to use?"
  echo "   Examples:  mtartdept.com   artdept.studio   mterpeza.art"
  echo ""
  read -r -p "   Enter your domain (no www): " DOMAIN
  DOMAIN="${DOMAIN,,}"   # lowercase
  [[ -z "$DOMAIN" ]] && err "Domain cannot be empty."
  save_state
fi
success "Domain: ${DOMAIN}  (www.${DOMAIN} will also be covered)"

# ── STEP 2: ACM SSL Certificate (must be in us-east-1 for CloudFront) ────────
hr
if [[ -z "$CERT_ARN" ]]; then
  info "STEP 2 of 5 — Requesting SSL certificate from AWS (free)..."
  CERT_ARN=$(aws acm request-certificate \
    --domain-name "$DOMAIN" \
    --subject-alternative-names "www.${DOMAIN}" \
    --validation-method DNS \
    --region us-east-1 \
    --query 'CertificateArn' \
    --output text)
  save_state
fi
success "Certificate ARN: ${CERT_ARN}"

# ── STEP 3: Route 53 hosted zone ─────────────────────────────────────────────
hr
if [[ -z "$HOSTED_ZONE_ID" ]]; then
  info "STEP 3 of 5 — Creating Route 53 hosted zone for ${DOMAIN}..."

  # Check if it already exists
  EXISTING=$(aws route53 list-hosted-zones-by-name \
    --dns-name "${DOMAIN}." \
    --query "HostedZones[?Name=='${DOMAIN}.'].Id" \
    --output text 2>/dev/null || true)

  if [[ -n "$EXISTING" ]]; then
    HOSTED_ZONE_ID=$(basename "$EXISTING")
    info "Hosted zone already exists: ${HOSTED_ZONE_ID}"
  else
    CALLER_REF="artdept-$(date +%s)"
    HOSTED_ZONE_ID=$(aws route53 create-hosted-zone \
      --name "$DOMAIN" \
      --caller-reference "$CALLER_REF" \
      --query 'HostedZone.Id' \
      --output text | cut -d'/' -f3)
  fi
  save_state
fi
success "Hosted Zone ID: ${HOSTED_ZONE_ID}"

# ── STEP 3b: Auto-add ACM DNS validation records ──────────────────────────────
info "Adding DNS validation records for your SSL certificate..."
sleep 5  # give ACM a moment to populate

VALIDATION_OPTIONS=$(aws acm describe-certificate \
  --certificate-arn "$CERT_ARN" \
  --region us-east-1 \
  --query 'Certificate.DomainValidationOptions' \
  --output json)

RECORD_NAME=$(echo "$VALIDATION_OPTIONS" | python3 -c "import sys,json; opts=json.load(sys.stdin); print(opts[0]['ResourceRecord']['Name'])" 2>/dev/null || echo "")
RECORD_VALUE=$(echo "$VALIDATION_OPTIONS" | python3 -c "import sys,json; opts=json.load(sys.stdin); print(opts[0]['ResourceRecord']['Value'])" 2>/dev/null || echo "")

if [[ -n "$RECORD_NAME" && -n "$RECORD_VALUE" ]]; then
  aws route53 change-resource-record-sets \
    --hosted-zone-id "$HOSTED_ZONE_ID" \
    --change-batch "{
      \"Changes\": [{
        \"Action\": \"UPSERT\",
        \"ResourceRecordSet\": {
          \"Name\": \"${RECORD_NAME}\",
          \"Type\": \"CNAME\",
          \"TTL\": 300,
          \"ResourceRecords\": [{\"Value\": \"${RECORD_VALUE}\"}]
        }
      }]
    }" > /dev/null
  success "DNS validation record added automatically."
else
  warn "Could not auto-add validation record — ACM may need a minute. Re-run the script to retry."
fi

# ── STEP 4: CloudFront distribution ──────────────────────────────────────────
hr
if [[ -z "$CF_ID" ]]; then
  info "STEP 4 of 5 — Creating CloudFront distribution (this takes ~3 minutes)..."

  CF_RESULT=$(aws cloudfront create-distribution \
    --distribution-config "{
      \"CallerReference\": \"artdept-cf-$(date +%s)\",
      \"Aliases\": {
        \"Quantity\": 2,
        \"Items\": [\"${DOMAIN}\", \"www.${DOMAIN}\"]
      },
      \"DefaultRootObject\": \"index.html\",
      \"Origins\": {
        \"Quantity\": 1,
        \"Items\": [{
          \"Id\": \"eb-origin\",
          \"DomainName\": \"${EB_CNAME}\",
          \"CustomOriginConfig\": {
            \"HTTPPort\": 80,
            \"HTTPSPort\": 443,
            \"OriginProtocolPolicy\": \"http-only\"
          }
        }]
      },
      \"DefaultCacheBehavior\": {
        \"TargetOriginId\": \"eb-origin\",
        \"ViewerProtocolPolicy\": \"redirect-to-https\",
        \"AllowedMethods\": {
          \"Quantity\": 7,
          \"Items\": [\"GET\",\"HEAD\",\"OPTIONS\",\"PUT\",\"POST\",\"PATCH\",\"DELETE\"],
          \"CachedMethods\": {\"Quantity\": 2, \"Items\": [\"GET\",\"HEAD\"]}
        },
        \"ForwardedValues\": {
          \"QueryString\": true,
          \"Cookies\": {\"Forward\": \"all\"},
          \"Headers\": {\"Quantity\": 1, \"Items\": [\"*\"]}
        },
        \"MinTTL\": 0,
        \"DefaultTTL\": 0,
        \"MaxTTL\": 0,
        \"Compress\": true
      },
      \"CustomErrorResponses\": {
        \"Quantity\": 1,
        \"Items\": [{
          \"ErrorCode\": 404,
          \"ResponsePagePath\": \"/index.html\",
          \"ResponseCode\": \"200\",
          \"ErrorCachingMinTTL\": 0
        }]
      },
      \"ViewerCertificate\": {
        \"ACMCertificateArn\": \"${CERT_ARN}\",
        \"SSLSupportMethod\": \"sni-only\",
        \"MinimumProtocolVersion\": \"TLSv1.2_2021\"
      },
      \"HttpVersion\": \"http2\",
      \"Enabled\": true,
      \"Comment\": \"Art Dept - ${DOMAIN}\"
    }")

  CF_ID=$(echo "$CF_RESULT" | python3 -c "import sys,json; print(json.load(sys.stdin)['Distribution']['Id'])")
  CF_DOMAIN=$(echo "$CF_RESULT" | python3 -c "import sys,json; print(json.load(sys.stdin)['Distribution']['DomainName'])")
  save_state
fi
success "CloudFront Distribution ID: ${CF_ID}"
success "CloudFront Domain: ${CF_DOMAIN}"

# ── STEP 5: Route 53 A records → CloudFront ───────────────────────────────────
hr
info "STEP 5 of 5 — Pointing ${DOMAIN} and www.${DOMAIN} to CloudFront..."

CF_HOSTED_ZONE="Z2FDTNDATAQYW2"  # CloudFront's fixed hosted zone ID (always this value)

aws route53 change-resource-record-sets \
  --hosted-zone-id "$HOSTED_ZONE_ID" \
  --change-batch "{
    \"Changes\": [
      {
        \"Action\": \"UPSERT\",
        \"ResourceRecordSet\": {
          \"Name\": \"${DOMAIN}\",
          \"Type\": \"A\",
          \"AliasTarget\": {
            \"HostedZoneId\": \"${CF_HOSTED_ZONE}\",
            \"DNSName\": \"${CF_DOMAIN}\",
            \"EvaluateTargetHealth\": false
          }
        }
      },
      {
        \"Action\": \"UPSERT\",
        \"ResourceRecordSet\": {
          \"Name\": \"www.${DOMAIN}\",
          \"Type\": \"A\",
          \"AliasTarget\": {
            \"HostedZoneId\": \"${CF_HOSTED_ZONE}\",
            \"DNSName\": \"${CF_DOMAIN}\",
            \"EvaluateTargetHealth\": false
          }
        }
      }
    ]
  }" > /dev/null

success "DNS records created."

# ── Summary ───────────────────────────────────────────────────────────────────
hr
echo ""
echo -e "${GREEN}  ✓ Automation complete! Here's what was set up:${NC}"
echo ""
echo -e "  • SSL cert requested (free, auto-renews)"
echo -e "  • Route 53 hosted zone created"
echo -e "  • CloudFront CDN configured (HTTPS, React routing)"
echo -e "  • DNS pointed to CloudFront"
echo ""
echo -e "${YELLOW}  ── ONE MANUAL STEP REMAINING ──────────────────────${NC}"
echo ""
echo -e "  You need to register the domain '${DOMAIN}' and point"
echo -e "  its nameservers to Route 53. Here are your nameservers:"
echo ""
aws route53 get-hosted-zone --id "$HOSTED_ZONE_ID" \
  --query 'DelegationSet.NameServers' --output text | tr '\t' '\n' | sed 's/^/    • /'
echo ""
echo -e "  1. Buy the domain at: https://www.namecheap.com  (cheapest)"
echo -e "     or:                https://console.aws.amazon.com/route53/v2/home#DomainRegistration"
echo ""
echo -e "  2. In your registrar's dashboard, set 'Custom Nameservers'"
echo -e "     to the 4 nameservers listed above."
echo ""
echo -e "  3. Wait 10-30 minutes for DNS to propagate, then visit:"
echo -e "     https://${DOMAIN}"
echo ""
echo -e "${CYAN}  To deploy site updates any time, just run:${NC}"
echo -e "  npm run deploy:eb"
echo ""
hr
