-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "hashedPassword" TEXT NOT NULL,
    "salt" TEXT NOT NULL,
    "resetToken" TEXT,
    "resetTokenExpiresAt" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Budget" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Budget_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" SERIAL NOT NULL,
    "nickname" TEXT NOT NULL,
    "cleared_balance" INTEGER NOT NULL DEFAULT 0,
    "uncleared_balance" INTEGER NOT NULL DEFAULT 0,
    "payeeId" INTEGER NOT NULL,
    "budgetId" INTEGER,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payee" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Payee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" SERIAL NOT NULL,
    "category" TEXT NOT NULL,
    "accountId" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL DEFAULT 0,
    "description" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "payeeId" INTEGER,
    "outflow" INTEGER NOT NULL DEFAULT 0,
    "inflow" INTEGER NOT NULL DEFAULT 0,
    "cleared" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Budget_name_key" ON "Budget"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Account_nickname_key" ON "Account"("nickname");

-- CreateIndex
CREATE UNIQUE INDEX "Account_payeeId_key" ON "Account"("payeeId");

-- CreateIndex
CREATE UNIQUE INDEX "Payee_name_key" ON "Payee"("name");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_payeeId_fkey" FOREIGN KEY ("payeeId") REFERENCES "Payee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_budgetId_fkey" FOREIGN KEY ("budgetId") REFERENCES "Budget"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_payeeId_fkey" FOREIGN KEY ("payeeId") REFERENCES "Payee"("id") ON DELETE SET NULL ON UPDATE CASCADE;
