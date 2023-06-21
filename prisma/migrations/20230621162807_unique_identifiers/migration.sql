/*
  Warnings:

  - You are about to drop the column `Company` on the `Sublease` table. All the data in the column will be lost.
  - You are about to drop the column `iamge3` on the `Sublease` table. All the data in the column will be lost.
  - Added the required column `company` to the `Sublease` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Misc] ADD [isMisc] BIT NOT NULL CONSTRAINT [Misc_isMisc_df] DEFAULT 1;

-- AlterTable
ALTER TABLE [dbo].[Parking] ADD [isParking] BIT NOT NULL CONSTRAINT [Parking_isParking_df] DEFAULT 1;

-- AlterTable
ALTER TABLE [dbo].[SportsTicket] ADD [isSportsTicket] BIT NOT NULL CONSTRAINT [SportsTicket_isSportsTicket_df] DEFAULT 1;

-- AlterTable
ALTER TABLE [dbo].[Sublease] DROP COLUMN [Company],
[iamge3];
ALTER TABLE [dbo].[Sublease] ADD [company] NVARCHAR(1000) NOT NULL,
[image3] VARBINARY(max),
[isSublease] BIT NOT NULL CONSTRAINT [Sublease_isSublease_df] DEFAULT 1;

-- AlterTable
ALTER TABLE [dbo].[Textbook] ADD [isTextbook] BIT NOT NULL CONSTRAINT [Textbook_isTextbook_df] DEFAULT 1;

-- AlterTable
ALTER TABLE [dbo].[TransitTicket] ADD [isTransitTicket] BIT NOT NULL CONSTRAINT [TransitTicket_isTransitTicket_df] DEFAULT 1;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
