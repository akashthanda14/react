/*
  Warnings:

  - You are about to drop the column `subtopicId` on the `problems` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "problems" DROP CONSTRAINT "problems_subtopicId_fkey";

-- DropIndex
DROP INDEX "problems_subtopicId_idx";

-- AlterTable
ALTER TABLE "problems" DROP COLUMN "subtopicId";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "currentStreak" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "lastActivityDate" TIMESTAMP(3),
ADD COLUMN     "longestStreak" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "problem_subtopics" (
    "id" TEXT NOT NULL,
    "problemId" TEXT NOT NULL,
    "subtopicId" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "problem_subtopics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "problem_sheets" (
    "problemId" TEXT NOT NULL,
    "sheetId" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE INDEX "problem_subtopics_problemId_idx" ON "problem_subtopics"("problemId");

-- CreateIndex
CREATE INDEX "problem_subtopics_subtopicId_idx" ON "problem_subtopics"("subtopicId");

-- CreateIndex
CREATE UNIQUE INDEX "problem_subtopics_problemId_subtopicId_key" ON "problem_subtopics"("problemId", "subtopicId");

-- CreateIndex
CREATE INDEX "problem_sheets_problemId_idx" ON "problem_sheets"("problemId");

-- CreateIndex
CREATE INDEX "problem_sheets_sheetId_idx" ON "problem_sheets"("sheetId");

-- CreateIndex
CREATE INDEX "problem_sheets_order_idx" ON "problem_sheets"("order");

-- CreateIndex
CREATE UNIQUE INDEX "problem_sheets_problemId_sheetId_key" ON "problem_sheets"("problemId", "sheetId");

-- CreateIndex
CREATE INDEX "user_problem_progress_userId_status_idx" ON "user_problem_progress"("userId", "status");

-- CreateIndex
CREATE INDEX "user_problem_progress_userId_isBookmarked_idx" ON "user_problem_progress"("userId", "isBookmarked");

-- AddForeignKey
ALTER TABLE "problem_subtopics" ADD CONSTRAINT "problem_subtopics_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "problems"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "problem_subtopics" ADD CONSTRAINT "problem_subtopics_subtopicId_fkey" FOREIGN KEY ("subtopicId") REFERENCES "subtopics"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "problem_sheets" ADD CONSTRAINT "problem_sheets_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "problems"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "problem_sheets" ADD CONSTRAINT "problem_sheets_sheetId_fkey" FOREIGN KEY ("sheetId") REFERENCES "sheets"("id") ON DELETE CASCADE ON UPDATE CASCADE;
