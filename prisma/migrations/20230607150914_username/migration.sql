/*
  Warnings:

  - You are about to drop the column `netId` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
BEGIN TRY

BEGIN TRAN;

-- DropIndex
ALTER TABLE [dbo].[User] DROP CONSTRAINT [User_netId_key];

-- AlterTable
ALTER TABLE [dbo].[User] DROP COLUMN [netId];
ALTER TABLE [dbo].[User] ADD [username] NVARCHAR(1000) NOT NULL CONSTRAINT [User_username_df] DEFAULT 'default';

-- CreateIndex
ALTER TABLE [dbo].[User] ADD CONSTRAINT [User_username_key] UNIQUE NONCLUSTERED ([username]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
