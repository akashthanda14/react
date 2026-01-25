/*
  Warnings:

  - You are about to drop the column `slug` on the `company_tags` table. All the data in the column will be lost.
  - You are about to drop the column `website` on the `company_tags` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "company_tags_slug_idx";

-- DropIndex
DROP INDEX "company_tags_slug_key";

-- AlterTable
ALTER TABLE "company_tags" DROP COLUMN "slug",
DROP COLUMN "website";
