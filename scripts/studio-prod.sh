#!/bin/bash

# Open Prisma Studio for production database
# Usage: ./scripts/studio-prod.sh

set -e

echo "🎨 Opening Prisma Studio for PRODUCTION database..."

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

# Open Prisma Studio with production URL
DATABASE_URL=$DATABASE_URL npx prisma studio
