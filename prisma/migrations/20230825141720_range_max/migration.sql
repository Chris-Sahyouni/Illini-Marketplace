-- CreateTable
CREATE TABLE "RangeMaxes" (
    "id" TEXT NOT NULL,
    "subleasePrice" INTEGER NOT NULL DEFAULT 1500,
    "subleaseBedrooms" INTEGER NOT NULL DEFAULT 10,
    "subleaseBathrooms" INTEGER NOT NULL DEFAULT 6,
    "textbookPrice" INTEGER NOT NULL DEFAULT 200,
    "ticketPrice" INTEGER NOT NULL DEFAULT 200,
    "ticketAmount" INTEGER NOT NULL DEFAULT 10,
    "transitPrice" INTEGER NOT NULL DEFAULT 100,
    "parkingPrice" INTEGER NOT NULL DEFAULT 100,
    "miscPrice" INTEGER NOT NULL DEFAULT 100,

    CONSTRAINT "RangeMaxes_pkey" PRIMARY KEY ("id")
);
