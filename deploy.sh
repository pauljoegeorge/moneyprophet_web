#!/bin/sh
# Build and deploy using private environment configuration.
set -eu

SCRIPT_DIR=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
cd "$SCRIPT_DIR"

# This optional, ignored file uses shell assignments, not Vite configuration.
if [ -f .deploy.env ]; then
  set -a
  . ./.deploy.env
  set +a
fi

: "${S3_BUCKET:?Set S3_BUCKET in .deploy.env or your environment}"
: "${CLOUDFRONT_DISTRIBUTION_ID:?Set CLOUDFRONT_DISTRIBUTION_ID in .deploy.env or your environment}"

case "$S3_BUCKET" in
  *[!a-z0-9.-]*|"") printf '%s\n' 'S3_BUCKET must be a bucket name, without s3:// or a path.' >&2; exit 1 ;;
esac

for tool in npm aws; do
  if ! command -v "$tool" >/dev/null 2>&1; then
    printf 'Required command is unavailable: %s\n' "$tool" >&2
    exit 1
  fi
done

printf '%s\n' 'Building Money Prophet…'
npm run build

# Guard against uploading an incomplete build.
for file in index.html app.html sign_in/index.html; do
  if [ ! -f "build/$file" ]; then
    printf 'Required build file is missing: %s\n' "$file" >&2
    exit 1
  fi
done

printf '%s\n' 'Uploading build to S3…'
# Retain older hashed assets for clients with an already-open page.
aws s3 sync build/ "s3://$S3_BUCKET/" \
  --cache-control 'public,max-age=0,must-revalidate' --only-show-errors

printf '%s\n' 'Invalidating CloudFront cache…'
INVALIDATION_ID=$(aws cloudfront create-invalidation \
  --distribution-id "$CLOUDFRONT_DISTRIBUTION_ID" \
  --paths '/*' --query 'Invalidation.Id' --output text)

if [ -z "$INVALIDATION_ID" ] || [ "$INVALIDATION_ID" = None ]; then
  printf '%s\n' 'CloudFront did not return an invalidation ID.' >&2
  exit 1
fi

printf '%s\n' 'Waiting for CloudFront invalidation to complete…'
aws cloudfront wait invalidation-completed \
  --distribution-id "$CLOUDFRONT_DISTRIBUTION_ID" \
  --id "$INVALIDATION_ID"

printf '%s\n' 'Deployment complete. CloudFront cache invalidation completed.'
