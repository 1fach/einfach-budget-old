/*
  Warnings:

  - A unique constraint covering the columns `[name,budgetCategoryGroupId]` on the table `budget_category` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,budgetId]` on the table `budget_category_group` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "budget_category_name_budgetCategoryGroupId_key" ON "budget_category"("name", "budgetCategoryGroupId");

-- CreateIndex
CREATE UNIQUE INDEX "budget_category_group_name_budgetId_key" ON "budget_category_group"("name", "budgetId");
