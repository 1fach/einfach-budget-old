-- AlterTable
ALTER TABLE "Transaction" ALTER COLUMN "date" SET DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "MonthlyBudget" (
    "id" SERIAL NOT NULL,
    "month" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "budgetId" INTEGER NOT NULL,

    CONSTRAINT "MonthlyBudget_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MonthlyBudgetCategory" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "assigned" INTEGER NOT NULL DEFAULT 0,
    "activity" INTEGER NOT NULL DEFAULT 0,
    "available" INTEGER NOT NULL DEFAULT 0,
    "parentId" INTEGER NOT NULL,

    CONSTRAINT "MonthlyBudgetCategory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MonthlyBudget" ADD CONSTRAINT "MonthlyBudget_budgetId_fkey" FOREIGN KEY ("budgetId") REFERENCES "Budget"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MonthlyBudgetCategory" ADD CONSTRAINT "MonthlyBudgetCategory_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "MonthlyBudgetCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
