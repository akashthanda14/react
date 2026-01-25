/*
  Warnings:

  - You are about to drop the column `attempts` on the `user_problem_progress` table. All the data in the column will be lost.
  - You are about to drop the column `code` on the `user_problem_progress` table. All the data in the column will be lost.
  - You are about to drop the column `lastAttemptAt` on the `user_problem_progress` table. All the data in the column will be lost.
  - You are about to drop the column `timeSpentMins` on the `user_problem_progress` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user_problem_progress" DROP COLUMN "attempts",
DROP COLUMN "code",
DROP COLUMN "lastAttemptAt",
DROP COLUMN "timeSpentMins",
ADD COLUMN     "isBookmarked" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE INDEX "user_problem_progress_isBookmarked_idx" ON "user_problem_progress"("isBookmarked");
