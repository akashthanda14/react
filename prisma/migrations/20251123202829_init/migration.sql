-- CreateEnum
CREATE TYPE "Difficulty" AS ENUM ('EASY', 'MEDIUM', 'HARD');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "ProblemStatus" AS ENUM ('NOT_STARTED', 'IN_PROGRESS', 'SOLVED');

-- CreateEnum
CREATE TYPE "SourcePlatform" AS ENUM ('LEETCODE', 'HACKERRANK', 'CODEFORCES', 'GEEKSFORGEEKS', 'INTERNAL', 'OTHER');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "avatar" TEXT,
    "role" "UserRole" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "topics" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "icon" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "topics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "problems" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "difficulty" "Difficulty" NOT NULL,
    "isPremium" BOOLEAN NOT NULL DEFAULT false,
    "sourcePlatform" "SourcePlatform" NOT NULL DEFAULT 'INTERNAL',
    "externalUrl" TEXT,
    "hints" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "constraints" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "examples" JSONB[],
    "timeComplexity" TEXT,
    "spaceComplexity" TEXT,
    "acceptance" DOUBLE PRECISION DEFAULT 0,
    "submissionCount" INTEGER NOT NULL DEFAULT 0,
    "successCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "topicId" TEXT,

    CONSTRAINT "problems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "company_tags" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "logo" TEXT,
    "website" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "company_tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "problem_company_tags" (
    "id" TEXT NOT NULL,
    "problemId" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "frequency" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "problem_company_tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "resource_links" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "problemId" TEXT NOT NULL,

    CONSTRAINT "resource_links_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_problem_progress" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "problemId" TEXT NOT NULL,
    "status" "ProblemStatus" NOT NULL DEFAULT 'NOT_STARTED',
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "notes" TEXT,
    "code" TEXT,
    "lastAttemptAt" TIMESTAMP(3),
    "solvedAt" TIMESTAMP(3),
    "timeSpentMins" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_problem_progress_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_email_idx" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "topics_name_key" ON "topics"("name");

-- CreateIndex
CREATE UNIQUE INDEX "topics_slug_key" ON "topics"("slug");

-- CreateIndex
CREATE INDEX "topics_slug_idx" ON "topics"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "problems_slug_key" ON "problems"("slug");

-- CreateIndex
CREATE INDEX "problems_slug_idx" ON "problems"("slug");

-- CreateIndex
CREATE INDEX "problems_difficulty_idx" ON "problems"("difficulty");

-- CreateIndex
CREATE INDEX "problems_topicId_idx" ON "problems"("topicId");

-- CreateIndex
CREATE INDEX "problems_isPremium_idx" ON "problems"("isPremium");

-- CreateIndex
CREATE INDEX "problems_sourcePlatform_idx" ON "problems"("sourcePlatform");

-- CreateIndex
CREATE UNIQUE INDEX "company_tags_name_key" ON "company_tags"("name");

-- CreateIndex
CREATE UNIQUE INDEX "company_tags_slug_key" ON "company_tags"("slug");

-- CreateIndex
CREATE INDEX "company_tags_slug_idx" ON "company_tags"("slug");

-- CreateIndex
CREATE INDEX "problem_company_tags_problemId_idx" ON "problem_company_tags"("problemId");

-- CreateIndex
CREATE INDEX "problem_company_tags_companyId_idx" ON "problem_company_tags"("companyId");

-- CreateIndex
CREATE UNIQUE INDEX "problem_company_tags_problemId_companyId_key" ON "problem_company_tags"("problemId", "companyId");

-- CreateIndex
CREATE INDEX "resource_links_problemId_idx" ON "resource_links"("problemId");

-- CreateIndex
CREATE INDEX "user_problem_progress_userId_idx" ON "user_problem_progress"("userId");

-- CreateIndex
CREATE INDEX "user_problem_progress_problemId_idx" ON "user_problem_progress"("problemId");

-- CreateIndex
CREATE INDEX "user_problem_progress_status_idx" ON "user_problem_progress"("status");

-- CreateIndex
CREATE UNIQUE INDEX "user_problem_progress_userId_problemId_key" ON "user_problem_progress"("userId", "problemId");

-- AddForeignKey
ALTER TABLE "problems" ADD CONSTRAINT "problems_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "topics"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "problem_company_tags" ADD CONSTRAINT "problem_company_tags_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "problems"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "problem_company_tags" ADD CONSTRAINT "problem_company_tags_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "company_tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "resource_links" ADD CONSTRAINT "resource_links_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "problems"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_problem_progress" ADD CONSTRAINT "user_problem_progress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_problem_progress" ADD CONSTRAINT "user_problem_progress_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "problems"("id") ON DELETE CASCADE ON UPDATE CASCADE;
