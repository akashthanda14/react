/*
  Warnings:

  - You are about to drop the column `createdAt` on the `problems` table. All the data in the column will be lost.
  - You are about to drop the column `slug` on the `problems` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `problems` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "problems_slug_idx";

-- DropIndex
DROP INDEX "problems_slug_key";

-- AlterTable
ALTER TABLE "problems" DROP COLUMN "createdAt",
DROP COLUMN "slug",
DROP COLUMN "updatedAt";
