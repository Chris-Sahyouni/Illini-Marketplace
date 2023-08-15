/*
  Warnings:

  - Made the column `name` on table `Misc` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Misc" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "name" SET DEFAULT '';

-- CreateTable
CREATE TABLE "_SavedSubleases" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_SavedTransit" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_SavedTickets" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_SavedTextbooks" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_SavedParking" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_SavedMisc" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_SavedSubleases_AB_unique" ON "_SavedSubleases"("A", "B");

-- CreateIndex
CREATE INDEX "_SavedSubleases_B_index" ON "_SavedSubleases"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_SavedTransit_AB_unique" ON "_SavedTransit"("A", "B");

-- CreateIndex
CREATE INDEX "_SavedTransit_B_index" ON "_SavedTransit"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_SavedTickets_AB_unique" ON "_SavedTickets"("A", "B");

-- CreateIndex
CREATE INDEX "_SavedTickets_B_index" ON "_SavedTickets"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_SavedTextbooks_AB_unique" ON "_SavedTextbooks"("A", "B");

-- CreateIndex
CREATE INDEX "_SavedTextbooks_B_index" ON "_SavedTextbooks"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_SavedParking_AB_unique" ON "_SavedParking"("A", "B");

-- CreateIndex
CREATE INDEX "_SavedParking_B_index" ON "_SavedParking"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_SavedMisc_AB_unique" ON "_SavedMisc"("A", "B");

-- CreateIndex
CREATE INDEX "_SavedMisc_B_index" ON "_SavedMisc"("B");

-- AddForeignKey
ALTER TABLE "_SavedSubleases" ADD CONSTRAINT "_SavedSubleases_A_fkey" FOREIGN KEY ("A") REFERENCES "Sublease"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SavedSubleases" ADD CONSTRAINT "_SavedSubleases_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SavedTransit" ADD CONSTRAINT "_SavedTransit_A_fkey" FOREIGN KEY ("A") REFERENCES "Transit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SavedTransit" ADD CONSTRAINT "_SavedTransit_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SavedTickets" ADD CONSTRAINT "_SavedTickets_A_fkey" FOREIGN KEY ("A") REFERENCES "Ticket"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SavedTickets" ADD CONSTRAINT "_SavedTickets_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SavedTextbooks" ADD CONSTRAINT "_SavedTextbooks_A_fkey" FOREIGN KEY ("A") REFERENCES "Textbook"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SavedTextbooks" ADD CONSTRAINT "_SavedTextbooks_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SavedParking" ADD CONSTRAINT "_SavedParking_A_fkey" FOREIGN KEY ("A") REFERENCES "Parking"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SavedParking" ADD CONSTRAINT "_SavedParking_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SavedMisc" ADD CONSTRAINT "_SavedMisc_A_fkey" FOREIGN KEY ("A") REFERENCES "Misc"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SavedMisc" ADD CONSTRAINT "_SavedMisc_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
