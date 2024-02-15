/*
  - Creates the view to get the sum of all transactions, which belongs to an account.
  - Creates the view to get the sum of all outflows per category in a month and the available amount.
  - Creates the view to get the sum of all outflows per category group in a month.
  - Creates the view to get the running balance of all transactions.
  - Creates the view to get the ready to assign amount per budget.
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
  SUM(assigned - activity) OVER (PARTITION BY "budgetCategoryId" ORDER BY "year", "month" ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) as available
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
GROUP BY "budgetCategoryGroupId", "month", "year";


-- CreateView
CREATE VIEW "transaction_running_balance" AS
SELECT
	tr."id" as "transactionId",
	SUM(inflow - outflow) OVER (PARTITION BY "budgetCategoryId" ORDER BY tr."date", "createdAt", tr."id" ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS "runningBalance"
FROM "transaction" tr
LEFT JOIN monthly_budget_per_category mb
  ON mb.id = tr."monthlyBudgetPerCategoryId";


-- CreateView
CREATE VIEW "budget_ready_to_assign" AS
WITH cumulative_inflow AS (
	SELECT
		"budgetId",
		"month",
		"year",
		SUM(SUM("inflow")) OVER (ORDER BY "year", "month") AS "cumulativeInflow"
	FROM monthly_budget_per_category mb
	LEFT JOIN "transaction" tr
	  ON mb.id = tr."monthlyBudgetPerCategoryId"
	LEFT JOIN budget_category bc
	  ON mb."budgetCategoryId" = bc.id
	LEFT JOIN budget_category_group bcg
	  ON bc."budgetCategoryGroupId" = bcg.id
	GROUP BY "budgetId", "month", "year"
), total_assigned AS (
	SELECT
		"budgetId",
		SUM(mb."assigned") AS "totalAssigned"
	FROM monthly_budget_per_category mb
	LEFT JOIN budget_category bc
	  ON mb."budgetCategoryId" = bc.id
	LEFT JOIN budget_category_group bcg
	  ON bc."budgetCategoryGroupId" = bcg.id
	GROUP BY "budgetId"
), cumulative_assigned AS (
	SELECT
		"budgetId",
		"month",
		"year",
		SUM(SUM(mb."assigned")) OVER (ORDER BY "year", "month") AS "cumulativeAssigned"
	FROM monthly_budget_per_category mb
	LEFT JOIN budget_category bc
	  ON mb."budgetCategoryId" = bc.id
	LEFT JOIN budget_category_group bcg
	  ON bc."budgetCategoryGroupId" = bcg.id
	GROUP BY "budgetId", "month", "year"
)

SELECT
	ta."budgetId",
	ci."month",
	ci."year",
	CASE WHEN ("cumulativeAssigned" > "cumulativeInflow")
		THEN ("cumulativeInflow" - "cumulativeAssigned")
		ELSE GREATEST(0, "cumulativeInflow" - "totalAssigned") END AS "readyToAssign"
FROM cumulative_inflow ci
LEFT JOIN total_assigned ta
  ON ci."budgetId" = ta."budgetId"
LEFT JOIN cumulative_assigned ca
  ON ci."budgetId" = ca."budgetId" AND ci."month" = ca."month" AND ci."year" = ca."year";
