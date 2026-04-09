#!/usr/bin/env bash
set -euo pipefail

ENV_NAME="${1:-Artdeptdemo-env}"
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

if ! command -v eb >/dev/null 2>&1; then
  echo "Error: EB CLI not found. Install awsebcli first." >&2
  exit 1
fi

if ! command -v rsync >/dev/null 2>&1; then
  echo "Error: rsync is required but not installed." >&2
  exit 1
fi

if [[ ! -f "${ROOT_DIR}/.elasticbeanstalk/config.yml" ]]; then
  echo "Error: EB is not initialized in ${ROOT_DIR}. Run 'eb init artdeptdemo --platform \"Node.js 24 running on 64bit Amazon Linux 2023\" --region us-east-1' once." >&2
  exit 1
fi

echo "[1/5] Building frontend in ${ROOT_DIR} with S3 asset base"
cd "${ROOT_DIR}"
npm run build

echo "[2/5] Removing local bundled images from build output"
rm -rf "${ROOT_DIR}/build/images"

echo "[3/5] Verifying build output"
if [[ ! -f "${ROOT_DIR}/build/index.html" ]]; then
  echo "Error: Build did not produce build/index.html" >&2
  exit 1
fi

echo "[4/5] Deploying to Elastic Beanstalk environment: ${ENV_NAME}"
cd "${ROOT_DIR}"
eb deploy "${ENV_NAME}"

echo "[5/5] Deployment status"
eb status "${ENV_NAME}"
