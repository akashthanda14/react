/*
  Warnings:

  - You are about to drop the column `description` on the `problems` table. All the data in the column will be lost.
  - You are about to drop the column `sourcePlatform` on the `problems` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "problems_sourcePlatform_idx";

-- AlterTable
ALTER TABLE "problems" DROP COLUMN "description",
DROP COLUMN "sourcePlatform";

-- DropEnum
DROP TYPE "SourcePlatform";
