/*
  Warnings:

  - You are about to drop the column `parentId` on the `BudgetCategory` table. All the data in the column will be lost.
  - You are about to drop the column `budgetCategoryId` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the `MonthlyBudget` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MonthlyBudgetCategory` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[budgetId,nickname]` on the table `Account` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,name]` on the table `Budget` will be added. If there are existing duplicate values, this will fail.
  - Made the column `budgetId` on table `Account` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `groupId` to the `BudgetCategory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `monthlyBudgetPerCategoryId` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_budgetId_fkey";

-- DropForeignKey
ALTER TABLE "BudgetCategory" DROP CONSTRAINT "BudgetCategory_parentId_fkey";

-- DropForeignKey
ALTER TABLE "MonthlyBudget" DROP CONSTRAINT "MonthlyBudget_budgetId_fkey";

-- DropForeignKey
ALTER TABLE "MonthlyBudgetCategory" DROP CONSTRAINT "MonthlyBudgetCategory_budgetCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "MonthlyBudgetCategory" DROP CONSTRAINT "MonthlyBudgetCategory_monthlyBudgetId_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_budgetCategoryId_fkey";

-- DropIndex
DROP INDEX "Account_nickname_key";

-- DropIndex
DROP INDEX "Budget_name_key";

-- DropIndex
DROP INDEX "Payee_name_key";

-- AlterTable
ALTER TABLE "Account" ALTER COLUMN "budgetId" SET NOT NULL;

-- AlterTable
ALTER TABLE "BudgetCategory" DROP COLUMN "parentId",
ADD COLUMN     "groupId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "budgetCategoryId",
ADD COLUMN     "monthlyBudgetPerCategoryId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "MonthlyBudget";

-- DropTable
DROP TABLE "MonthlyBudgetCategory";

-- CreateTable
CREATE TABLE "MonthlyBudgetPerCategory" (
    "id" SERIAL NOT NULL,
    "month" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "assigned" INTEGER NOT NULL DEFAULT 0,
    "activity" INTEGER NOT NULL DEFAULT 0,
    "available" INTEGER NOT NULL DEFAULT 0,
    "budgetCategoryId" INTEGER NOT NULL,

    CONSTRAINT "MonthlyBudgetPerCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BudgetCategoryGroup" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "budgetId" INTEGER NOT NULL,

    CONSTRAINT "BudgetCategoryGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BudgetCategoryGroupOrder" (
    "id" SERIAL NOT NULL,
    "order" SERIAL NOT NULL,
    "categoryGroupId" INTEGER NOT NULL,

    CONSTRAINT "BudgetCategoryGroupOrder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BudgetCategoryOrder" (
    "id" SERIAL NOT NULL,
    "order" SERIAL NOT NULL,
    "categoryGroupOrderId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "BudgetCategoryOrder_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MonthlyBudgetPerCategory_month_year_budgetCategoryId_key" ON "MonthlyBudgetPerCategory"("month", "year", "budgetCategoryId");

-- CreateIndex
CREATE UNIQUE INDEX "BudgetCategoryGroupOrder_categoryGroupId_key" ON "BudgetCategoryGroupOrder"("categoryGroupId");

-- CreateIndex
CREATE UNIQUE INDEX "BudgetCategoryOrder_categoryId_key" ON "BudgetCategoryOrder"("categoryId");

-- CreateIndex
CREATE UNIQUE INDEX "Account_budgetId_nickname_key" ON "Account"("budgetId", "nickname");

-- CreateIndex
CREATE UNIQUE INDEX "Budget_userId_name_key" ON "Budget"("userId", "name");

-- AddForeignKey
ALTER TABLE "MonthlyBudgetPerCategory" ADD CONSTRAINT "MonthlyBudgetPerCategory_budgetCategoryId_fkey" FOREIGN KEY ("budgetCategoryId") REFERENCES "BudgetCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BudgetCategoryGroup" ADD CONSTRAINT "BudgetCategoryGroup_budgetId_fkey" FOREIGN KEY ("budgetId") REFERENCES "Budget"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BudgetCategory" ADD CONSTRAINT "BudgetCategory_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "BudgetCategoryGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BudgetCategoryGroupOrder" ADD CONSTRAINT "BudgetCategoryGroupOrder_categoryGroupId_fkey" FOREIGN KEY ("categoryGroupId") REFERENCES "BudgetCategoryGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BudgetCategoryOrder" ADD CONSTRAINT "BudgetCategoryOrder_categoryGroupOrderId_fkey" FOREIGN KEY ("categoryGroupOrderId") REFERENCES "BudgetCategoryGroupOrder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BudgetCategoryOrder" ADD CONSTRAINT "BudgetCategoryOrder_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "BudgetCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_budgetId_fkey" FOREIGN KEY ("budgetId") REFERENCES "Budget"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_monthlyBudgetPerCategoryId_fkey" FOREIGN KEY ("monthlyBudgetPerCategoryId") REFERENCES "MonthlyBudgetPerCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
