/*
  Warnings:

  - You are about to drop the `Item` table. If the table is not empty, all the data it contains will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[Item] DROP CONSTRAINT [Item_sellerId_fkey];

-- AlterTable
ALTER TABLE [dbo].[User] ADD [contact] NVARCHAR(1000);

-- DropTable
DROP TABLE [dbo].[Item];

-- CreateTable
CREATE TABLE [dbo].[Sublease] (
    [address] NVARCHAR(1000) NOT NULL,
    [image2] VARBINARY(max),
    [iamge3] VARBINARY(max),
    [image4] VARBINARY(max),
    [Company] NVARCHAR(1000) NOT NULL,
    [numBedrooms] INT NOT NULL,
    [numBathrooms] INT NOT NULL,
    [startDate] DATETIME2 NOT NULL,
    [endDate] DATETIME2 NOT NULL,
    [id] NVARCHAR(1000) NOT NULL,
    [price] FLOAT(53) NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    [description] NVARCHAR(1000),
    [notes] NVARCHAR(1000),
    [contact] NVARCHAR(1000) NOT NULL,
    [image] VARBINARY(max),
    [sellerId] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Sublease_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [tags] NVARCHAR(1000),
    CONSTRAINT [Sublease_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[SportsTicket] (
    [game] NVARCHAR(1000) NOT NULL,
    [location] NVARCHAR(1000) NOT NULL,
    [date] DATETIME2 NOT NULL,
    [numTix] INT NOT NULL,
    [sport] NVARCHAR(1000) NOT NULL,
    [id] NVARCHAR(1000) NOT NULL,
    [price] FLOAT(53) NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    [description] NVARCHAR(1000),
    [notes] NVARCHAR(1000),
    [contact] NVARCHAR(1000) NOT NULL,
    [image] VARBINARY(max),
    [sellerId] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [SportsTicket_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [tags] NVARCHAR(1000),
    CONSTRAINT [SportsTicket_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[TransitTicket] (
    [dateTime] DATETIME2 NOT NULL,
    [mode] NVARCHAR(1000) NOT NULL,
    [from] NVARCHAR(1000) NOT NULL,
    [to] NVARCHAR(1000) NOT NULL,
    [id] NVARCHAR(1000) NOT NULL,
    [price] FLOAT(53) NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    [description] NVARCHAR(1000),
    [notes] NVARCHAR(1000),
    [contact] NVARCHAR(1000) NOT NULL,
    [image] VARBINARY(max),
    [sellerId] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [TransitTicket_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [tags] NVARCHAR(1000),
    CONSTRAINT [TransitTicket_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Textbook] (
    [course] NVARCHAR(1000) NOT NULL,
    [id] NVARCHAR(1000) NOT NULL,
    [price] FLOAT(53) NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    [description] NVARCHAR(1000),
    [notes] NVARCHAR(1000),
    [contact] NVARCHAR(1000) NOT NULL,
    [image] VARBINARY(max),
    [sellerId] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Textbook_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [tags] NVARCHAR(1000),
    CONSTRAINT [Textbook_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Parking] (
    [location] NVARCHAR(1000) NOT NULL,
    [startDate] DATETIME2 NOT NULL,
    [endDate] DATETIME2,
    [id] NVARCHAR(1000) NOT NULL,
    [price] FLOAT(53) NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    [description] NVARCHAR(1000),
    [notes] NVARCHAR(1000),
    [contact] NVARCHAR(1000) NOT NULL,
    [image] VARBINARY(max),
    [sellerId] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Parking_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [tags] NVARCHAR(1000),
    CONSTRAINT [Parking_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Misc] (
    [fields] NVARCHAR(1000),
    [id] NVARCHAR(1000) NOT NULL,
    [price] FLOAT(53) NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    [description] NVARCHAR(1000),
    [notes] NVARCHAR(1000),
    [contact] NVARCHAR(1000) NOT NULL,
    [image] VARBINARY(max),
    [sellerId] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Misc_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [tags] NVARCHAR(1000),
    CONSTRAINT [Misc_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[bannedEmail] (
    [email] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [bannedEmail_email_key] UNIQUE NONCLUSTERED ([email])
);

-- AddForeignKey
ALTER TABLE [dbo].[Sublease] ADD CONSTRAINT [Sublease_sellerId_fkey] FOREIGN KEY ([sellerId]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[SportsTicket] ADD CONSTRAINT [SportsTicket_sellerId_fkey] FOREIGN KEY ([sellerId]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[TransitTicket] ADD CONSTRAINT [TransitTicket_sellerId_fkey] FOREIGN KEY ([sellerId]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Textbook] ADD CONSTRAINT [Textbook_sellerId_fkey] FOREIGN KEY ([sellerId]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Parking] ADD CONSTRAINT [Parking_sellerId_fkey] FOREIGN KEY ([sellerId]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Misc] ADD CONSTRAINT [Misc_sellerId_fkey] FOREIGN KEY ([sellerId]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
