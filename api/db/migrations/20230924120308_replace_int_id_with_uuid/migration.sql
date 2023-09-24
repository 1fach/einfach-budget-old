/*
  Warnings:

  - The primary key for the `Account` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Budget` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `BudgetCategory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `BudgetCategoryGroup` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `MonthlyBudgetPerCategory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Payee` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Transaction` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_budgetId_fkey";

-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_payeeId_fkey";

-- DropForeignKey
ALTER TABLE "Budget" DROP CONSTRAINT "Budget_userId_fkey";

-- DropForeignKey
ALTER TABLE "BudgetCategory" DROP CONSTRAINT "BudgetCategory_groupId_fkey";

-- DropForeignKey
ALTER TABLE "BudgetCategoryGroup" DROP CONSTRAINT "BudgetCategoryGroup_budgetId_fkey";

-- DropForeignKey
ALTER TABLE "MonthlyBudgetPerCategory" DROP CONSTRAINT "MonthlyBudgetPerCategory_budgetCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_accountId_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_monthlyBudgetPerCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_payeeId_fkey";

-- AlterTable
ALTER TABLE "Account" DROP CONSTRAINT "Account_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "payeeId" SET DATA TYPE TEXT,
ALTER COLUMN "budgetId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Account_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Account_id_seq";

-- AlterTable
ALTER TABLE "Budget" DROP CONSTRAINT "Budget_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Budget_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Budget_id_seq";

-- AlterTable
ALTER TABLE "BudgetCategory" DROP CONSTRAINT "BudgetCategory_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "groupId" SET DATA TYPE TEXT,
ADD CONSTRAINT "BudgetCategory_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "BudgetCategory_id_seq";

-- AlterTable
ALTER TABLE "BudgetCategoryGroup" DROP CONSTRAINT "BudgetCategoryGroup_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "budgetId" SET DATA TYPE TEXT,
ADD CONSTRAINT "BudgetCategoryGroup_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "BudgetCategoryGroup_id_seq";

-- AlterTable
ALTER TABLE "MonthlyBudgetPerCategory" DROP CONSTRAINT "MonthlyBudgetPerCategory_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "budgetCategoryId" SET DATA TYPE TEXT,
ADD CONSTRAINT "MonthlyBudgetPerCategory_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "MonthlyBudgetPerCategory_id_seq";

-- AlterTable
ALTER TABLE "Payee" DROP CONSTRAINT "Payee_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Payee_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Payee_id_seq";

-- AlterTable
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "accountId" SET DATA TYPE TEXT,
ALTER COLUMN "payeeId" SET DATA TYPE TEXT,
ALTER COLUMN "monthlyBudgetPerCategoryId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Transaction_id_seq";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_payeeId_fkey" FOREIGN KEY ("payeeId") REFERENCES "Payee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_budgetId_fkey" FOREIGN KEY ("budgetId") REFERENCES "Budget"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_payeeId_fkey" FOREIGN KEY ("payeeId") REFERENCES "Payee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_monthlyBudgetPerCategoryId_fkey" FOREIGN KEY ("monthlyBudgetPerCategoryId") REFERENCES "MonthlyBudgetPerCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Budget" ADD CONSTRAINT "Budget_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MonthlyBudgetPerCategory" ADD CONSTRAINT "MonthlyBudgetPerCategory_budgetCategoryId_fkey" FOREIGN KEY ("budgetCategoryId") REFERENCES "BudgetCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BudgetCategoryGroup" ADD CONSTRAINT "BudgetCategoryGroup_budgetId_fkey" FOREIGN KEY ("budgetId") REFERENCES "Budget"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BudgetCategory" ADD CONSTRAINT "BudgetCategory_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "BudgetCategoryGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
