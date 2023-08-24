-- AlterTable
ALTER TABLE "Misc" ADD COLUMN     "description" TEXT NOT NULL DEFAULT '',
ALTER COLUMN "notes" SET DEFAULT '';

-- AlterTable
ALTER TABLE "Parking" ALTER COLUMN "notes" SET DEFAULT '';

-- AlterTable
ALTER TABLE "Sublease" ALTER COLUMN "notes" SET DEFAULT '';

-- AlterTable
ALTER TABLE "Textbook" ALTER COLUMN "notes" SET DEFAULT '';

-- AlterTable
ALTER TABLE "Ticket" ALTER COLUMN "notes" SET DEFAULT '';

-- AlterTable
ALTER TABLE "Transit" ALTER COLUMN "notes" SET DEFAULT '';
