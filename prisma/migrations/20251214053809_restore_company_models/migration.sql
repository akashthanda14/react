-- CreateTable
CREATE TABLE "company_tags" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "logo" TEXT,
    "website" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "company_tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "problem_company_tags" (
    "id" TEXT NOT NULL,
    "problemId" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "frequency" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "problem_company_tags_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "company_tags_name_key" ON "company_tags"("name");

-- CreateIndex
CREATE UNIQUE INDEX "company_tags_slug_key" ON "company_tags"("slug");

-- CreateIndex
CREATE INDEX "company_tags_slug_idx" ON "company_tags"("slug");

-- CreateIndex
CREATE INDEX "problem_company_tags_companyId_idx" ON "problem_company_tags"("companyId");

-- CreateIndex
CREATE INDEX "problem_company_tags_problemId_idx" ON "problem_company_tags"("problemId");

-- CreateIndex
CREATE UNIQUE INDEX "problem_company_tags_problemId_companyId_key" ON "problem_company_tags"("problemId", "companyId");

-- AddForeignKey
ALTER TABLE "problem_company_tags" ADD CONSTRAINT "problem_company_tags_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "company_tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "problem_company_tags" ADD CONSTRAINT "problem_company_tags_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "problems"("id") ON DELETE CASCADE ON UPDATE CASCADE;
