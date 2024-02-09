/*
  - Creates the view to get the sum of all transactions, which belongs to an account.
  - Creates the view to get the sum of all outflows per category in a month.
  - Creates the view to get the sum of all outflows per category group in a month.
*/


-- CreateView
CREATE VIEW "account_balance" AS
WITH balances AS (
  SELECT
    account.id AS accountId,
    SUM(inflow) - SUM(CASE WHEN cleared THEN outflow ELSE 0 END) AS clearedBalance,
    COALESCE(SUM(CASE WHEN cleared THEN 0 ELSE outflow END), 0) AS unclearedBalance
  FROM account
  LEFT JOIN "transaction"
    ON "transaction"."accountId" = account.id
  GROUP BY account.id
)

SELECT
  accountId,
  clearedBalance,
  unclearedBalance,
  clearedBalance - unclearedBalance AS workingBalance
FROM balances;


-- CreateView
CREATE VIEW monthly_category_activity AS
WITH outflows AS (
  SELECT
    monthly_budget_per_category.id AS "monthlyBudgetPerCategoryId",
    assigned,
    COALESCE(SUM("transaction".outflow), 0) AS activity,
    monthly_budget_per_category.month,
    monthly_budget_per_category.year,
    monthly_budget_per_category."budgetCategoryId"
  FROM monthly_budget_per_category
  LEFT JOIN "transaction"
    ON "transaction"."monthlyBudgetPerCategoryId" = monthly_budget_per_category.id
  GROUP BY monthly_budget_per_category.id
)
SELECT
  "monthlyBudgetPerCategoryId",
  activity,
  SUM(assigned - activity) OVER (PARTITION BY "budgetCategoryId" ORDER BY "month", "year" ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) as available
FROM outflows;


-- CreateView
CREATE VIEW monthly_category_group_activity AS
SELECT
  "budgetCategoryGroupId",
  "month",
  "year",
  SUM(monthly_budget_per_category.assigned) as assigned,
  SUM(activity) as activity,
  SUM(available) as available
FROM monthly_category_activity
LEFT JOIN monthly_budget_per_category
  ON "monthlyBudgetPerCategoryId" = monthly_budget_per_category.id
LEFT JOIN budget_category
  ON monthly_budget_per_category."budgetCategoryId" = budget_category.id
GROUP BY "budgetCategoryGroupId", "month", "year"
