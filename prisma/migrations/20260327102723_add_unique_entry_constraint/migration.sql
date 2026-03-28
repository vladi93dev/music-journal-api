/*
  Warnings:

  - A unique constraint covering the columns `[userId,title]` on the table `Entry` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Entry_userId_title_key" ON "Entry"("userId", "title");
