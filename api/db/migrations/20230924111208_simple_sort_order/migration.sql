/*
  Warnings:

  - You are about to drop the `BudgetCategoryGroupOrder` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BudgetCategoryOrder` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `sortOrder` to the `BudgetCategory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sortOrder` to the `BudgetCategoryGroup` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "BudgetCategoryGroupOrder" DROP CONSTRAINT "BudgetCategoryGroupOrder_categoryGroupId_fkey";

-- DropForeignKey
ALTER TABLE "BudgetCategoryOrder" DROP CONSTRAINT "BudgetCategoryOrder_categoryGroupOrderId_fkey";

-- DropForeignKey
ALTER TABLE "BudgetCategoryOrder" DROP CONSTRAINT "BudgetCategoryOrder_categoryId_fkey";

-- AlterTable
ALTER TABLE "BudgetCategory" ADD COLUMN     "sortOrder" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "BudgetCategoryGroup" ADD COLUMN     "sortOrder" INTEGER NOT NULL;

-- DropTable
DROP TABLE "BudgetCategoryGroupOrder";

-- DropTable
DROP TABLE "BudgetCategoryOrder";
