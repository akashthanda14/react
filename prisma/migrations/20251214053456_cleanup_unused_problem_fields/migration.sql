/*
  Warnings:

  - You are about to drop the column `acceptance` on the `problems` table. All the data in the column will be lost.
  - You are about to drop the column `constraints` on the `problems` table. All the data in the column will be lost.
  - You are about to drop the column `examples` on the `problems` table. All the data in the column will be lost.
  - You are about to drop the column `externalUrl` on the `problems` table. All the data in the column will be lost.
  - You are about to drop the column `hints` on the `problems` table. All the data in the column will be lost.
  - You are about to drop the column `isPremium` on the `problems` table. All the data in the column will be lost.
  - You are about to drop the column `spaceComplexity` on the `problems` table. All the data in the column will be lost.
  - You are about to drop the column `submissionCount` on the `problems` table. All the data in the column will be lost.
  - You are about to drop the column `successCount` on the `problems` table. All the data in the column will be lost.
  - You are about to drop the column `timeComplexity` on the `problems` table. All the data in the column will be lost.
  - You are about to drop the `company_tags` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `problem_company_tags` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `resource_links` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "problem_company_tags" DROP CONSTRAINT "problem_company_tags_companyId_fkey";

-- DropForeignKey
ALTER TABLE "problem_company_tags" DROP CONSTRAINT "problem_company_tags_problemId_fkey";

-- DropForeignKey
ALTER TABLE "resource_links" DROP CONSTRAINT "resource_links_problemId_fkey";

-- DropIndex
DROP INDEX "problems_isPremium_idx";

-- AlterTable
ALTER TABLE "problems" DROP COLUMN "acceptance",
DROP COLUMN "constraints",
DROP COLUMN "examples",
DROP COLUMN "externalUrl",
DROP COLUMN "hints",
DROP COLUMN "isPremium",
DROP COLUMN "spaceComplexity",
DROP COLUMN "submissionCount",
DROP COLUMN "successCount",
DROP COLUMN "timeComplexity";

-- DropTable
DROP TABLE "company_tags";

-- DropTable
DROP TABLE "problem_company_tags";

-- DropTable
DROP TABLE "resource_links";
