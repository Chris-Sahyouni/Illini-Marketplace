/*
  Warnings:

  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[netId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `netId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- DropIndex
ALTER TABLE [dbo].[User] DROP CONSTRAINT [User_name_key];

-- AlterTable
ALTER TABLE [dbo].[User] DROP COLUMN [name];
ALTER TABLE [dbo].[User] ADD [netId] NVARCHAR(1000) NOT NULL;

-- CreateIndex
ALTER TABLE [dbo].[User] ADD CONSTRAINT [User_netId_key] UNIQUE NONCLUSTERED ([netId]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
