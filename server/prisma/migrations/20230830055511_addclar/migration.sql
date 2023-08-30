-- CreateTable
CREATE TABLE "Clarification" (
    "id" SERIAL NOT NULL,
    "teamId" INTEGER NOT NULL,
    "problemId" INTEGER NOT NULL,
    "question" TEXT NOT NULL,
    "anwser" TEXT NOT NULL,
    "isPublic" BOOLEAN NOT NULL,

    CONSTRAINT "Clarification_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Clarification" ADD CONSTRAINT "Clarification_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Clarification" ADD CONSTRAINT "Clarification_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "Problem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
