#!/bin/bash

# Seed production database with all data
# Usage: ./scripts/seed-prod.sh

set -e

echo "🌱 Seeding PRODUCTION database..."

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
read -p "This will seed production data. Continue? (yes/no): " confirm

if [ "$confirm" != "yes" ]; then
    echo "❌ Cancelled"
    exit 0
fi

echo ""
echo "Running main seed..."
DATABASE_URL=$DATABASE_URL tsx prisma/seed.ts

echo ""
echo "Running Last Minute 100 seed..."
DATABASE_URL=$DATABASE_URL tsx prisma/seed-lastminute.ts

echo ""
echo "✅ Production database seeded successfully!"
