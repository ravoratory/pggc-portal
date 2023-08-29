-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Admin', 'Tester', 'Normal');

-- CreateEnum
CREATE TYPE "Difficulty" AS ENUM ('Tutorial', 'Easy', 'Medium', 'Hard', 'Insane');

-- CreateEnum
CREATE TYPE "JudgeStatus" AS ENUM ('judging', 'correct', 'incorrect');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'Normal',
    "teamId" INTEGER,
    "pgritId" TEXT,
    "githubId" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Team" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "score" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Setting" (
    "id" SERIAL NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "finishedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Setting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Problem" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "difficulty" "Difficulty" NOT NULL,

    CONSTRAINT "Problem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "History" (
    "id" SERIAL NOT NULL,
    "teamId" INTEGER NOT NULL,
    "problemId" INTEGER NOT NULL,
    "status" "JudgeStatus" NOT NULL DEFAULT 'judging',

    CONSTRAINT "History_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Team_name_key" ON "Team"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Problem_title_key" ON "Problem"("title");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "Problem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
