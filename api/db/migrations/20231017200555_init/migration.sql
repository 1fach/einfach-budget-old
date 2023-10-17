-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "hashedPassword" TEXT NOT NULL,
    "salt" TEXT NOT NULL,
    "resetToken" TEXT,
    "resetTokenExpiresAt" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,
    "budgetId" TEXT NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payee" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "budgetId" TEXT NOT NULL,
    "accountId" TEXT,

    CONSTRAINT "Payee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "date" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "outflow" DECIMAL(12,2) NOT NULL DEFAULT 0.00,
    "inflow" DECIMAL(12,2) NOT NULL DEFAULT 0.00,
    "cleared" BOOLEAN NOT NULL DEFAULT false,
    "accountId" TEXT NOT NULL,
    "payeeId" TEXT,
    "monthlyBudgetPerCategoryId" TEXT NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Budget" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Budget_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MonthlyBudgetPerCategory" (
    "id" TEXT NOT NULL,
    "month" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "assigned" DECIMAL(12,2) NOT NULL DEFAULT 0.00,
    "budgetCategoryId" TEXT NOT NULL,

    CONSTRAINT "MonthlyBudgetPerCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BudgetCategoryGroup" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL,
    "budgetId" TEXT NOT NULL,

    CONSTRAINT "BudgetCategoryGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BudgetCategory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL,
    "budgetCategoryGroupId" TEXT NOT NULL,

    CONSTRAINT "BudgetCategory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "Account_budgetId_idx" ON "Account"("budgetId");

-- CreateIndex
CREATE UNIQUE INDEX "Account_budgetId_nickname_key" ON "Account"("budgetId", "nickname");

-- CreateIndex
CREATE UNIQUE INDEX "Payee_accountId_key" ON "Payee"("accountId");

-- CreateIndex
CREATE INDEX "Payee_budgetId_idx" ON "Payee"("budgetId");

-- CreateIndex
CREATE INDEX "Transaction_accountId_idx" ON "Transaction"("accountId");

-- CreateIndex
CREATE INDEX "Budget_userId_idx" ON "Budget"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Budget_userId_name_key" ON "Budget"("userId", "name");

-- CreateIndex
CREATE INDEX "MonthlyBudgetPerCategory_budgetCategoryId_idx" ON "MonthlyBudgetPerCategory"("budgetCategoryId");

-- CreateIndex
CREATE UNIQUE INDEX "MonthlyBudgetPerCategory_month_year_budgetCategoryId_key" ON "MonthlyBudgetPerCategory"("month", "year", "budgetCategoryId");

-- CreateIndex
CREATE INDEX "BudgetCategoryGroup_budgetId_idx" ON "BudgetCategoryGroup"("budgetId");

-- CreateIndex
CREATE INDEX "BudgetCategory_budgetCategoryGroupId_idx" ON "BudgetCategory"("budgetCategoryGroupId");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_budgetId_fkey" FOREIGN KEY ("budgetId") REFERENCES "Budget"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payee" ADD CONSTRAINT "Payee_budgetId_fkey" FOREIGN KEY ("budgetId") REFERENCES "Budget"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payee" ADD CONSTRAINT "Payee_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_payeeId_fkey" FOREIGN KEY ("payeeId") REFERENCES "Payee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_monthlyBudgetPerCategoryId_fkey" FOREIGN KEY ("monthlyBudgetPerCategoryId") REFERENCES "MonthlyBudgetPerCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Budget" ADD CONSTRAINT "Budget_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MonthlyBudgetPerCategory" ADD CONSTRAINT "MonthlyBudgetPerCategory_budgetCategoryId_fkey" FOREIGN KEY ("budgetCategoryId") REFERENCES "BudgetCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BudgetCategoryGroup" ADD CONSTRAINT "BudgetCategoryGroup_budgetId_fkey" FOREIGN KEY ("budgetId") REFERENCES "Budget"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BudgetCategory" ADD CONSTRAINT "BudgetCategory_budgetCategoryGroupId_fkey" FOREIGN KEY ("budgetCategoryGroupId") REFERENCES "BudgetCategoryGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;
