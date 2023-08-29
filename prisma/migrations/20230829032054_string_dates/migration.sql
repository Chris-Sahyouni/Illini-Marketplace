/*
  Warnings:

  - Made the column `end` on table `Parking` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Parking" ALTER COLUMN "start" SET DATA TYPE TEXT,
ALTER COLUMN "end" SET NOT NULL,
ALTER COLUMN "end" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Sublease" ALTER COLUMN "start" SET DATA TYPE TEXT,
ALTER COLUMN "end" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Ticket" ALTER COLUMN "date" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Transit" ALTER COLUMN "date" SET DATA TYPE TEXT;
