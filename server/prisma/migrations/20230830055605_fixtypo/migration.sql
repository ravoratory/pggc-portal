/*
  Warnings:

  - You are about to drop the column `anwser` on the `Clarification` table. All the data in the column will be lost.
  - Added the required column `answer` to the `Clarification` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Clarification" DROP COLUMN "anwser",
ADD COLUMN     "answer" TEXT NOT NULL;
