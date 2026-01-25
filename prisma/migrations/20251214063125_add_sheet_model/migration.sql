-- DropIndex
DROP INDEX "topics_name_key";

-- AlterTable
ALTER TABLE "topics" ADD COLUMN     "sheetId" TEXT;

-- CreateTable
CREATE TABLE "sheets" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sheets_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "sheets_name_key" ON "sheets"("name");

-- CreateIndex
CREATE INDEX "topics_sheetId_idx" ON "topics"("sheetId");

-- AddForeignKey
ALTER TABLE "topics" ADD CONSTRAINT "topics_sheetId_fkey" FOREIGN KEY ("sheetId") REFERENCES "sheets"("id") ON DELETE SET NULL ON UPDATE CASCADE;
