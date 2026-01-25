-- CreateTable: Subtopics
CREATE TABLE "subtopics" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "topicId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "subtopics_pkey" PRIMARY KEY ("id")
);

-- AlterTable: Add subtopicId to problems
ALTER TABLE "problems" ADD COLUMN "subtopicId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "subtopics_slug_key" ON "subtopics"("slug");
CREATE INDEX "subtopics_slug_idx" ON "subtopics"("slug");
CREATE INDEX "subtopics_topicId_idx" ON "subtopics"("topicId");

-- CreateIndex (on problems)
CREATE INDEX "problems_subtopicId_idx" ON "problems"("subtopicId");

-- AddForeignKey
ALTER TABLE "subtopics" ADD CONSTRAINT "subtopics_topicId_fkey" 
    FOREIGN KEY ("topicId") REFERENCES "topics"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "problems" ADD CONSTRAINT "problems_subtopicId_fkey" 
    FOREIGN KEY ("subtopicId") REFERENCES "subtopics"("id") ON DELETE SET NULL ON UPDATE CASCADE;
