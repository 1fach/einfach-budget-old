/*
  Creates the view to get the outflows per category in a month.
*/

-- CreateView
CREATE VIEW "MonthlyCategoryOutflow" AS
SELECT
  "monthlyBudgetPerCategoryId",
  SUM(outflow) as outflow
FROM "Transaction"
GROUP BY "monthlyBudgetPerCategoryId";
