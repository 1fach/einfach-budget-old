/*
  - Creates the view to get the sum of all transactions, which belongs to an account.
  - Creates the view to get the outflows per category in a month.
*/


-- CreateView
CREATE VIEW "TotalTransactionsPerAccount" AS
SELECT
  "Account".id AS "accountId",
  SUM(inflow) - SUM(CASE WHEN cleared THEN outflow ELSE 0 END) AS "clearedBalance",
  0 - SUM(CASE WHEN cleared THEN 0 ELSE outflow END) AS "unclearedBalance"
FROM "Account"
LEFT JOIN "Transaction"
  ON "Transaction"."accountId" = "Account".id
GROUP BY "Account".id;


-- CreateView
CREATE VIEW "MonthlyCategoryOutflow" AS
SELECT
  "MonthlyBudgetPerCategory".id AS "monthlyBudgetPerCategoryId",
  COALESCE(SUM("Transaction".outflow), 0) AS outflow
FROM "MonthlyBudgetPerCategory"
LEFT JOIN "Transaction"
  ON "Transaction"."monthlyBudgetPerCategoryId" = "MonthlyBudgetPerCategory".id
GROUP BY "MonthlyBudgetPerCategory".id
