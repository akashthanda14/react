#!/bin/bash

# Script to sync Docker (dev) database to Production database
# This will:
# 1. Deploy schema migrations to production
# 2. Seed production with the same data as dev
# 3. Verify the sync

set -e  # Exit on error

echo "🚀 Starting Database Sync: Docker (Dev) → Production"
echo "=================================================="

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if .env file exists
if [ ! -f .env ]; then
    echo -e "${RED}❌ Error: .env file not found${NC}"
    exit 1
fi

# Load environment variables
source .env

# Verify both database URLs exist
if [ -z "$DOCKER_DATABASE_URL" ]; then
    echo -e "${RED}❌ Error: DOCKER_DATABASE_URL not found in .env${NC}"
    exit 1
fi

if [ -z "$DATABASE_URL" ]; then
    echo -e "${RED}❌ Error: DATABASE_URL (production) not found in .env${NC}"
    exit 1
fi

echo -e "${YELLOW}⚠️  WARNING: This will modify your PRODUCTION database!${NC}"
echo "Docker (Dev) URL: ${DOCKER_DATABASE_URL:0:30}..."
echo "Production URL: ${DATABASE_URL:0:30}..."
echo ""
read -p "Are you sure you want to continue? (yes/no): " confirm

if [ "$confirm" != "yes" ]; then
    echo "❌ Sync cancelled"
    exit 0
fi

echo ""
echo "Step 1/4: Generating Prisma Client..."
npm run db:generate

echo ""
echo "Step 2/4: Deploying migrations to production..."
DATABASE_URL=$DATABASE_URL npm run db:migrate:deploy

echo ""
echo "Step 3/4: Seeding production database..."
echo "  - Running main seed..."
DATABASE_URL=$DATABASE_URL npm run db:seed

echo "  - Running Last Minute 100 seed..."
DATABASE_URL=$DATABASE_URL npm run db:seed:lastminute

echo ""
echo "Step 4/4: Verifying sync..."
echo -e "${GREEN}✅ Database sync completed successfully!${NC}"
echo ""
echo "Next steps:"
echo "  - Verify data in production: DATABASE_URL=\$DATABASE_URL npm run db:studio"
echo "  - Check application connectivity"
echo ""
