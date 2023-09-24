/*
  Warnings:

  - You are about to drop the column `activity` on the `MonthlyBudgetPerCategory` table. All the data in the column will be lost.
  - You are about to drop the column `available` on the `MonthlyBudgetPerCategory` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "MonthlyBudgetPerCategory" DROP COLUMN "activity",
DROP COLUMN "available",
ALTER COLUMN "assigned" SET DEFAULT 0.00,
ALTER COLUMN "assigned" SET DATA TYPE DECIMAL(12,2);

-- AlterTable
ALTER TABLE "Transaction" ALTER COLUMN "date" SET DATA TYPE DATE,
ALTER COLUMN "outflow" SET DEFAULT 0.00,
ALTER COLUMN "outflow" SET DATA TYPE DECIMAL(12,2),
ALTER COLUMN "inflow" SET DEFAULT 0.00,
ALTER COLUMN "inflow" SET DATA TYPE DECIMAL(12,2);
