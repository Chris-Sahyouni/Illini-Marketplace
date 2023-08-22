/*
  Warnings:

  - You are about to drop the column `hasImage` on the `Misc` table. All the data in the column will be lost.
  - You are about to drop the column `hasImage` on the `Parking` table. All the data in the column will be lost.
  - You are about to drop the column `hasImage` on the `Sublease` table. All the data in the column will be lost.
  - You are about to drop the column `image2` on the `Sublease` table. All the data in the column will be lost.
  - You are about to drop the column `image3` on the `Sublease` table. All the data in the column will be lost.
  - You are about to drop the column `image4` on the `Sublease` table. All the data in the column will be lost.
  - You are about to drop the column `hasImage` on the `Textbook` table. All the data in the column will be lost.
  - You are about to drop the column `hasImage` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the column `hasImage` on the `Transit` table. All the data in the column will be lost.
  - Made the column `contact` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Misc" DROP COLUMN "hasImage",
ADD COLUMN     "numImages" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Parking" DROP COLUMN "hasImage",
ADD COLUMN     "numImages" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Sublease" DROP COLUMN "hasImage",
DROP COLUMN "image2",
DROP COLUMN "image3",
DROP COLUMN "image4",
ADD COLUMN     "numImages" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Textbook" DROP COLUMN "hasImage",
ADD COLUMN     "numImages" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Ticket" DROP COLUMN "hasImage",
ADD COLUMN     "numImages" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Transit" DROP COLUMN "hasImage",
ADD COLUMN     "numImages" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "contact" SET NOT NULL,
ALTER COLUMN "contact" SET DEFAULT '';
