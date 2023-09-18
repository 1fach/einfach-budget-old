-- DropForeignKey
ALTER TABLE "BudgetCategory" DROP CONSTRAINT "BudgetCategory_parentId_fkey";

-- AlterTable
ALTER TABLE "BudgetCategory" ALTER COLUMN "parentId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "BudgetCategory" ADD CONSTRAINT "BudgetCategory_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "BudgetCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;
