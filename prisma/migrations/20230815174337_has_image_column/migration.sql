/*
  Warnings:

  - You are about to drop the column `image` on the `Misc` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Parking` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Sublease` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Textbook` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Transit` table. All the data in the column will be lost.
  - Added the required column `hasImage` to the `Misc` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hasImage` to the `Parking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hasImage` to the `Sublease` table without a default value. This is not possible if the table is not empty.
  - Made the column `image4` on table `Sublease` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `hasImage` to the `Textbook` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hasImage` to the `Ticket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hasImage` to the `Transit` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Misc" DROP COLUMN "image",
ADD COLUMN     "hasImage" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "Parking" DROP COLUMN "image",
ADD COLUMN     "hasImage" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "Sublease" DROP COLUMN "image",
ADD COLUMN     "hasImage" BOOLEAN NOT NULL,
ALTER COLUMN "image2" SET DATA TYPE TEXT,
ALTER COLUMN "image3" SET DATA TYPE TEXT,
ALTER COLUMN "image4" SET NOT NULL,
ALTER COLUMN "image4" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Textbook" DROP COLUMN "image",
ADD COLUMN     "hasImage" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "Ticket" DROP COLUMN "image",
ADD COLUMN     "hasImage" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "Transit" DROP COLUMN "image",
ADD COLUMN     "hasImage" BOOLEAN NOT NULL;
