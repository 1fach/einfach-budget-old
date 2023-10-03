/*
  - Creates the view to get the sum of all transactions, which belongs to an account.
  - Creates the view to get the sum of all outflows per category in a month.
  - Creates the view to get the sum of all outflows per category group in a month.
*/


-- CreateView
CREATE VIEW "AccountBalance" AS
WITH balances AS (
  SELECT
    "Account".id AS "accountId",
    SUM(inflow) - SUM(CASE WHEN cleared THEN outflow ELSE 0 END) AS "clearedBalance",
    COALESCE(SUM(CASE WHEN cleared THEN 0 ELSE outflow END), 0) AS "unclearedBalance"
  FROM "Account"
  LEFT JOIN "Transaction"
    ON "Transaction"."accountId" = "Account".id
  GROUP BY "Account".id
)

SELECT
  "accountId",
  "clearedBalance",
  "unclearedBalance",
  "clearedBalance" - "unclearedBalance" AS "workingBalance"
FROM balances;


-- CreateView
CREATE VIEW "MonthlyCategoryActivity" AS
WITH outflows AS (
  SELECT
    "MonthlyBudgetPerCategory".id AS "monthlyBudgetPerCategoryId",
    assigned,
    COALESCE(SUM("Transaction".outflow), 0) AS activity
  FROM "MonthlyBudgetPerCategory"
  LEFT JOIN "Transaction"
    ON "Transaction"."monthlyBudgetPerCategoryId" = "MonthlyBudgetPerCategory".id
  GROUP BY "MonthlyBudgetPerCategory".id
)

SELECT
  "monthlyBudgetPerCategoryId",
  activity,
  assigned - activity AS available
FROM outflows;


-- CreateView
CREATE VIEW "MonthlyCategoryGroupActivity" AS
SELECT
  "budgetCategoryGroupId",
  "month",
  "year",
  SUM("MonthlyBudgetPerCategory".assigned) as assigned,
  SUM(activity) as activity,
  SUM(available) as available
FROM "MonthlyCategoryActivity"
LEFT JOIN "MonthlyBudgetPerCategory"
  ON "monthlyBudgetPerCategoryId" = "MonthlyBudgetPerCategory".id
LEFT JOIN "BudgetCategory"
  ON "MonthlyBudgetPerCategory"."budgetCategoryId" = "BudgetCategory".id
GROUP BY "budgetCategoryGroupId", "month", "year"
