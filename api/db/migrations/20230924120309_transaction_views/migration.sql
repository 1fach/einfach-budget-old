/*
  - Creates the view to get the sum of all transactions, which belongs to an account.
  - Creates the view to get the outflows per category in a month.
*/


-- CreateView
CREATE VIEW "TotalTransactionsPerAccount" AS
SELECT
  "accountId",
  SUM(inflow) - SUM(CASE WHEN cleared THEN outflow ELSE 0 END) as clearedBalance,
  SUM(inflow) - SUM(outflow) as unclearedBalance
FROM "Transaction"
GROUP BY "accountId";


-- CreateView
CREATE VIEW "MonthlyCategoryOutflow" AS
SELECT
  "monthlyBudgetPerCategoryId",
  SUM(outflow) as outflow
FROM "Transaction"
GROUP BY "monthlyBudgetPerCategoryId";
