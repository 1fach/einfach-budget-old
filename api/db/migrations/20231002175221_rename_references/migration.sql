/*
  Warnings:

  - You are about to drop the column `groupId` on the `BudgetCategory` table. All the data in the column will be lost.
  - Added the required column `budgetCategoryGroupId` to the `BudgetCategory` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "BudgetCategory" DROP CONSTRAINT "BudgetCategory_groupId_fkey";

-- AlterTable
ALTER TABLE "BudgetCategory" DROP COLUMN "groupId",
ADD COLUMN     "budgetCategoryGroupId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "BudgetCategory" ADD CONSTRAINT "BudgetCategory_budgetCategoryGroupId_fkey" FOREIGN KEY ("budgetCategoryGroupId") REFERENCES "BudgetCategoryGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
