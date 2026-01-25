/*
  Warnings:

  - You are about to drop the column `identification` on the `subtopics` table. All the data in the column will be lost.
  - You are about to drop the column `strategy` on the `subtopics` table. All the data in the column will be lost.
  - You are about to drop the column `isBookmarked` on the `user_problem_progress` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "user_problem_progress_isBookmarked_idx";

-- AlterTable
ALTER TABLE "problems" ADD COLUMN     "gfgUrl" TEXT;

-- AlterTable
ALTER TABLE "subtopics" DROP COLUMN "identification",
DROP COLUMN "strategy";

-- AlterTable
ALTER TABLE "user_problem_progress" DROP COLUMN "isBookmarked";
