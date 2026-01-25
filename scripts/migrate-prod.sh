#!/bin/bash

# Deploy migrations to production database
# Usage: ./scripts/migrate-prod.sh

set -e

echo "🔄 Deploying migrations to PRODUCTION database..."

# Load .env file
if [ -f .env ]; then
    export $(cat .env | grep -v '^#' | xargs)
fi

# Check if production DATABASE_URL exists
if [ -z "$DATABASE_URL" ]; then
    echo "❌ Error: DATABASE_URL not found in .env"
    exit 1
fi

echo "Production DB: ${DATABASE_URL:0:30}..."
read -p "Continue? (yes/no): " confirm

if [ "$confirm" != "yes" ]; then
    echo "❌ Cancelled"
    exit 0
fi

# Deploy migrations using production URL
DATABASE_URL=$DATABASE_URL npx prisma migrate deploy

echo "✅ Migrations deployed to production!"
