/*
  Warnings:

  - You are about to drop the column `cleared_balance` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `uncleared_balance` on the `Account` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Account" DROP COLUMN "cleared_balance",
DROP COLUMN "uncleared_balance";
