/*
  Warnings:

  - Added the required column `score` to the `History` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "History" ADD COLUMN     "score" INTEGER NOT NULL;
