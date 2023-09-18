/*
  Warnings:

  - You are about to drop the column `name` on the `MonthlyBudgetCategory` table. All the data in the column will be lost.
  - You are about to drop the column `parentId` on the `MonthlyBudgetCategory` table. All the data in the column will be lost.
  - You are about to drop the column `amount` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `category` on the `Transaction` table. All the data in the column will be lost.
  - Added the required column `budgetCategoryId` to the `MonthlyBudgetCategory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `monthlyBudgetId` to the `MonthlyBudgetCategory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `budgetCategoryId` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "MonthlyBudgetCategory" DROP CONSTRAINT "MonthlyBudgetCategory_parentId_fkey";

-- AlterTable
ALTER TABLE "MonthlyBudgetCategory" DROP COLUMN "name",
DROP COLUMN "parentId",
ADD COLUMN     "budgetCategoryId" INTEGER NOT NULL,
ADD COLUMN     "monthlyBudgetId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "amount",
DROP COLUMN "category",
ADD COLUMN     "budgetCategoryId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "BudgetCategory" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "parentId" INTEGER NOT NULL,

    CONSTRAINT "BudgetCategory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MonthlyBudgetCategory" ADD CONSTRAINT "MonthlyBudgetCategory_monthlyBudgetId_fkey" FOREIGN KEY ("monthlyBudgetId") REFERENCES "MonthlyBudget"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MonthlyBudgetCategory" ADD CONSTRAINT "MonthlyBudgetCategory_budgetCategoryId_fkey" FOREIGN KEY ("budgetCategoryId") REFERENCES "BudgetCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BudgetCategory" ADD CONSTRAINT "BudgetCategory_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "BudgetCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_budgetCategoryId_fkey" FOREIGN KEY ("budgetCategoryId") REFERENCES "MonthlyBudgetCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
