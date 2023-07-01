BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[User] (
    [id] NVARCHAR(1000) NOT NULL,
    [username] NVARCHAR(1000) NOT NULL,
    [password] NVARCHAR(1000) NOT NULL,
    [email] NVARCHAR(1000) NOT NULL,
    [isVerified] BIT NOT NULL CONSTRAINT [User_isVerified_df] DEFAULT 0,
    [joinedDate] DATETIME2 NOT NULL CONSTRAINT [User_joinedDate_df] DEFAULT CURRENT_TIMESTAMP,
    [isAdmin] BIT NOT NULL CONSTRAINT [User_isAdmin_df] DEFAULT 0,
    [contact] NVARCHAR(1000),
    CONSTRAINT [User_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [User_username_key] UNIQUE NONCLUSTERED ([username]),
    CONSTRAINT [User_email_key] UNIQUE NONCLUSTERED ([email])
);

-- CreateTable
CREATE TABLE [dbo].[Sublease] (
    [location] NVARCHAR(1000) NOT NULL,
    [image2] VARBINARY(max),
    [image3] VARBINARY(max),
    [image4] VARBINARY(max),
    [company] NVARCHAR(1000) NOT NULL,
    [bedrooms] INT NOT NULL,
    [bathrooms] INT NOT NULL,
    [start] DATETIME2 NOT NULL,
    [end] DATETIME2 NOT NULL,
    [term] NVARCHAR(1000) NOT NULL,
    [id] NVARCHAR(1000) NOT NULL,
    [price] FLOAT(53) NOT NULL,
    [name] NVARCHAR(1000),
    [notes] NVARCHAR(1000),
    [contact] NVARCHAR(1000) NOT NULL,
    [image] VARBINARY(max),
    [sellerId] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Sublease_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [Sublease_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Transit] (
    [from] NVARCHAR(1000) NOT NULL,
    [to] NVARCHAR(1000) NOT NULL,
    [mode] NVARCHAR(1000) NOT NULL,
    [date] DATETIME2 NOT NULL,
    [id] NVARCHAR(1000) NOT NULL,
    [price] FLOAT(53) NOT NULL,
    [name] NVARCHAR(1000),
    [notes] NVARCHAR(1000),
    [contact] NVARCHAR(1000) NOT NULL,
    [image] VARBINARY(max),
    [sellerId] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Transit_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [Transit_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Ticket] (
    [type] NVARCHAR(1000) NOT NULL,
    [event] NVARCHAR(1000) NOT NULL,
    [date] DATETIME2 NOT NULL,
    [seat] NVARCHAR(1000),
    [id] NVARCHAR(1000) NOT NULL,
    [price] FLOAT(53) NOT NULL,
    [name] NVARCHAR(1000),
    [notes] NVARCHAR(1000),
    [contact] NVARCHAR(1000) NOT NULL,
    [image] VARBINARY(max),
    [sellerId] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Ticket_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [Ticket_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Textbook] (
    [course] NVARCHAR(1000) NOT NULL,
    [id] NVARCHAR(1000) NOT NULL,
    [price] FLOAT(53) NOT NULL,
    [name] NVARCHAR(1000),
    [notes] NVARCHAR(1000),
    [contact] NVARCHAR(1000) NOT NULL,
    [image] VARBINARY(max),
    [sellerId] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Textbook_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [Textbook_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Parking] (
    [location] NVARCHAR(1000) NOT NULL,
    [start] DATETIME2 NOT NULL,
    [end] DATETIME2,
    [id] NVARCHAR(1000) NOT NULL,
    [price] FLOAT(53) NOT NULL,
    [name] NVARCHAR(1000),
    [notes] NVARCHAR(1000),
    [contact] NVARCHAR(1000) NOT NULL,
    [image] VARBINARY(max),
    [sellerId] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Parking_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [Parking_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[bannedEmail] (
    [email] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [bannedEmail_email_key] UNIQUE NONCLUSTERED ([email])
);

-- AddForeignKey
ALTER TABLE [dbo].[Sublease] ADD CONSTRAINT [Sublease_sellerId_fkey] FOREIGN KEY ([sellerId]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Transit] ADD CONSTRAINT [Transit_sellerId_fkey] FOREIGN KEY ([sellerId]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Ticket] ADD CONSTRAINT [Ticket_sellerId_fkey] FOREIGN KEY ([sellerId]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Textbook] ADD CONSTRAINT [Textbook_sellerId_fkey] FOREIGN KEY ([sellerId]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Parking] ADD CONSTRAINT [Parking_sellerId_fkey] FOREIGN KEY ([sellerId]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
