-- AlterEnum
ALTER TYPE "JudgeStatus" ADD VALUE 'partial';

-- AlterTable
ALTER TABLE "Clarification" ALTER COLUMN "answer" DROP NOT NULL;
