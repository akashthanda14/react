/*
  Warnings:

  - You are about to drop the column `gfgUrl` on the `problems` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "problems" DROP COLUMN "gfgUrl";

-- AlterTable
ALTER TABLE "subtopics" ADD COLUMN     "identification" TEXT,
ADD COLUMN     "strategy" TEXT;

-- AlterTable
ALTER TABLE "user_problem_progress" ADD COLUMN     "isBookmarked" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE INDEX "user_problem_progress_isBookmarked_idx" ON "user_problem_progress"("isBookmarked");
