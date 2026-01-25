/*
  Warnings:

  - You are about to drop the column `slug` on the `subtopics` table. All the data in the column will be lost.
  - You are about to drop the column `slug` on the `topics` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "subtopics_slug_idx";

-- DropIndex
DROP INDEX "subtopics_slug_key";

-- DropIndex
DROP INDEX "topics_slug_idx";

-- DropIndex
DROP INDEX "topics_slug_key";

-- AlterTable
ALTER TABLE "subtopics" DROP COLUMN "slug";

-- AlterTable
ALTER TABLE "topics" DROP COLUMN "slug";
