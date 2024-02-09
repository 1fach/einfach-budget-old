-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "hashedPassword" TEXT NOT NULL,
    "salt" TEXT NOT NULL,
    "resetToken" TEXT,
    "resetTokenExpiresAt" TIMESTAMP(3),

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "account" (
    "id" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,
    "budgetId" TEXT NOT NULL,
    "payeeId" TEXT NOT NULL,

    CONSTRAINT "account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payee" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "budgetId" TEXT NOT NULL,

    CONSTRAINT "payee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transaction" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "date" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "outflow" DECIMAL(12,2) NOT NULL DEFAULT 0.00,
    "inflow" DECIMAL(12,2) NOT NULL DEFAULT 0.00,
    "cleared" BOOLEAN NOT NULL DEFAULT false,
    "accountId" TEXT NOT NULL,
    "payeeId" TEXT,
    "monthlyBudgetPerCategoryId" TEXT NOT NULL,

    CONSTRAINT "transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "budget" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "budget_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "monthly_budget_per_category" (
    "id" TEXT NOT NULL,
    "month" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "assigned" DECIMAL(12,2) NOT NULL DEFAULT 0.00,
    "budgetCategoryId" TEXT NOT NULL,

    CONSTRAINT "monthly_budget_per_category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "budget_category_group" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL,
    "budgetId" TEXT NOT NULL,

    CONSTRAINT "budget_category_group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "budget_category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL,
    "budgetCategoryGroupId" TEXT NOT NULL,

    CONSTRAINT "budget_category_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "account_payeeId_key" ON "account"("payeeId");

-- CreateIndex
CREATE INDEX "account_budgetId_idx" ON "account"("budgetId");

-- CreateIndex
CREATE UNIQUE INDEX "account_budgetId_nickname_key" ON "account"("budgetId", "nickname");

-- CreateIndex
CREATE INDEX "payee_budgetId_idx" ON "payee"("budgetId");

-- CreateIndex
CREATE INDEX "transaction_accountId_idx" ON "transaction"("accountId");

-- CreateIndex
CREATE INDEX "budget_userId_idx" ON "budget"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "budget_userId_name_key" ON "budget"("userId", "name");

-- CreateIndex
CREATE INDEX "monthly_budget_per_category_budgetCategoryId_idx" ON "monthly_budget_per_category"("budgetCategoryId");

-- CreateIndex
CREATE UNIQUE INDEX "monthly_budget_per_category_month_year_budgetCategoryId_key" ON "monthly_budget_per_category"("month", "year", "budgetCategoryId");

-- CreateIndex
CREATE INDEX "budget_category_group_budgetId_idx" ON "budget_category_group"("budgetId");

-- CreateIndex
CREATE INDEX "budget_category_budgetCategoryGroupId_idx" ON "budget_category"("budgetCategoryGroupId");

-- AddForeignKey
ALTER TABLE "account" ADD CONSTRAINT "account_budgetId_fkey" FOREIGN KEY ("budgetId") REFERENCES "budget"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "account" ADD CONSTRAINT "account_payeeId_fkey" FOREIGN KEY ("payeeId") REFERENCES "payee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payee" ADD CONSTRAINT "payee_budgetId_fkey" FOREIGN KEY ("budgetId") REFERENCES "budget"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_payeeId_fkey" FOREIGN KEY ("payeeId") REFERENCES "payee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_monthlyBudgetPerCategoryId_fkey" FOREIGN KEY ("monthlyBudgetPerCategoryId") REFERENCES "monthly_budget_per_category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "budget" ADD CONSTRAINT "budget_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "monthly_budget_per_category" ADD CONSTRAINT "monthly_budget_per_category_budgetCategoryId_fkey" FOREIGN KEY ("budgetCategoryId") REFERENCES "budget_category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "budget_category_group" ADD CONSTRAINT "budget_category_group_budgetId_fkey" FOREIGN KEY ("budgetId") REFERENCES "budget"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "budget_category" ADD CONSTRAINT "budget_category_budgetCategoryGroupId_fkey" FOREIGN KEY ("budgetCategoryGroupId") REFERENCES "budget_category_group"("id") ON DELETE CASCADE ON UPDATE CASCADE;
