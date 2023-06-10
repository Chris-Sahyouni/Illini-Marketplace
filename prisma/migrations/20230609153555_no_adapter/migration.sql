/*
  Warnings:

  - You are about to drop the column `emailVerified` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Account` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VerificationToken` table. If the table is not empty, all the data it contains will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[Account] DROP CONSTRAINT [Account_userId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[Session] DROP CONSTRAINT [Session_userId_fkey];

-- AlterTable
ALTER TABLE [dbo].[User] DROP COLUMN [emailVerified];

-- DropTable
DROP TABLE [dbo].[Account];

-- DropTable
DROP TABLE [dbo].[Session];

-- DropTable
DROP TABLE [dbo].[VerificationToken];

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
