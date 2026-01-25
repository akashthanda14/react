-- CreateEnum
CREATE TYPE "QuestionType" AS ENUM ('MULTIPLE_CHOICE', 'TRUE_FALSE', 'SHORT_ANSWER');

-- CreateTable
CREATE TABLE "milestone_questions" (
    "id" TEXT NOT NULL,
    "milestoneId" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "type" "QuestionType" NOT NULL DEFAULT 'MULTIPLE_CHOICE',
    "explanation" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "milestone_questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "milestone_answer_options" (
    "id" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "isCorrect" BOOLEAN NOT NULL DEFAULT false,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "milestone_answer_options_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "milestone_questions_milestoneId_idx" ON "milestone_questions"("milestoneId");

-- CreateIndex
CREATE INDEX "milestone_questions_order_idx" ON "milestone_questions"("order");

-- CreateIndex
CREATE INDEX "milestone_answer_options_questionId_idx" ON "milestone_answer_options"("questionId");

-- CreateIndex
CREATE INDEX "milestone_answer_options_order_idx" ON "milestone_answer_options"("order");

-- AddForeignKey
ALTER TABLE "milestone_questions" ADD CONSTRAINT "milestone_questions_milestoneId_fkey" FOREIGN KEY ("milestoneId") REFERENCES "milestones"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "milestone_answer_options" ADD CONSTRAINT "milestone_answer_options_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "milestone_questions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
