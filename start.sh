#!/bin/bash

# ============================================================
# start.sh — One command to rule them all
# Starts PostgreSQL (Docker) + Next.js dev server
# Usage: bash start.sh
# ============================================================

set -e  # Exit immediately if any command fails

# ─── Colors for pretty output ───────────────────────────────
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# ─── Move to project root (wherever the script lives) ───────
cd "$(dirname "$0")"

echo ""
echo -e "${CYAN}╔══════════════════════════════════════╗${NC}"
echo -e "${CYAN}║       🚀  AkashCode Startup          ║${NC}"
echo -e "${CYAN}╚══════════════════════════════════════╝${NC}"
echo ""

# ─── 1. Ensure Docker is running ────────────────────────────
echo -e "${YELLOW}[1/3] Checking Docker...${NC}"
if ! docker info > /dev/null 2>&1; then
  echo -e "${YELLOW}    Docker is not running. Launching Docker Desktop...${NC}"
  open -a "Docker" 2>/dev/null || true

  # Wait up to 60 seconds for Docker daemon to become ready
  DOCKER_WAIT=0
  DOCKER_MAX=60
  until docker info > /dev/null 2>&1; do
    if [ $DOCKER_WAIT -ge $DOCKER_MAX ]; then
      echo -e "${RED}❌  Docker did not start within ${DOCKER_MAX}s.${NC}"
      echo -e "${RED}    Please open Docker Desktop manually and re-run this script.${NC}"
      exit 1
    fi
    sleep 2
    DOCKER_WAIT=$((DOCKER_WAIT + 2))
    echo -e "    ... waiting for Docker (${DOCKER_WAIT}s)"
  done
fi
echo -e "${GREEN}✅  Docker is running.${NC}"
echo ""

# ─── 2. Start PostgreSQL via Docker Compose ─────────────────
echo -e "${YELLOW}[2/3] Starting PostgreSQL container...${NC}"
docker compose up -d

# Wait for postgres to be healthy
echo -e "${YELLOW}    Waiting for PostgreSQL to be ready...${NC}"
MAX_WAIT=60
WAITED=0
until docker compose exec -T postgres pg_isready -U akashcode -d akashcode_db > /dev/null 2>&1; do
  if [ $WAITED -ge $MAX_WAIT ]; then
    echo -e "${RED}❌  PostgreSQL did not become healthy within ${MAX_WAIT}s. Check Docker logs.${NC}"
    exit 1
  fi
  sleep 2
  WAITED=$((WAITED + 2))
  echo -e "    ... still waiting (${WAITED}s)"
done
echo -e "${GREEN}✅  PostgreSQL is healthy on port 5433.${NC}"
echo ""

# ─── 3. Start Next.js dev server ────────────────────────────
echo -e "${YELLOW}[3/3] Starting Next.js dev server on http://localhost:3001 ...${NC}"

# Free port 3001 if something is already using it
if lsof -ti :3001 > /dev/null 2>&1; then
  echo -e "${YELLOW}    Port 3001 is in use. Killing existing process...${NC}"
  lsof -ti :3001 | xargs kill -9 2>/dev/null || true
  sleep 1
fi
echo -e "${GREEN}──────────────────────────────────────────────────────${NC}"
echo ""
npm run dev
