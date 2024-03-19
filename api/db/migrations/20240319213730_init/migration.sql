-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "hashed_password" TEXT NOT NULL,
    "salt" TEXT NOT NULL,
    "reset_token" TEXT,
    "reset_token_expires_at" TIMESTAMP(3),

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "account" (
    "id" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,
    "budget_id" TEXT NOT NULL,
    "payee_id" TEXT NOT NULL,

    CONSTRAINT "account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payee" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "budget_id" TEXT NOT NULL,

    CONSTRAINT "payee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transaction" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "date" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "outflow" BIGINT NOT NULL DEFAULT 0,
    "inflow" BIGINT NOT NULL DEFAULT 0,
    "cleared" BOOLEAN NOT NULL DEFAULT false,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "account_id" TEXT NOT NULL,
    "payee_id" TEXT,
    "monthly_budget_per_category_id" TEXT NOT NULL,

    CONSTRAINT "transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "budget" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "budget_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "monthly_budget_per_category" (
    "id" TEXT NOT NULL,
    "month" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "assigned" BIGINT NOT NULL DEFAULT 0,
    "budget_category_id" TEXT NOT NULL,

    CONSTRAINT "monthly_budget_per_category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "budget_category_group" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "sort_order" INTEGER NOT NULL,
    "budget_id" TEXT NOT NULL,

    CONSTRAINT "budget_category_group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "budget_category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "sort_order" INTEGER NOT NULL,
    "budget_category_group_id" TEXT NOT NULL,

    CONSTRAINT "budget_category_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "account_payee_id_key" ON "account"("payee_id");

-- CreateIndex
CREATE INDEX "account_budget_id_idx" ON "account"("budget_id");

-- CreateIndex
CREATE UNIQUE INDEX "account_budget_id_nickname_key" ON "account"("budget_id", "nickname");

-- CreateIndex
CREATE INDEX "payee_budget_id_idx" ON "payee"("budget_id");

-- CreateIndex
CREATE INDEX "transaction_account_id_idx" ON "transaction"("account_id");

-- CreateIndex
CREATE INDEX "budget_user_id_idx" ON "budget"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "budget_user_id_name_key" ON "budget"("user_id", "name");

-- CreateIndex
CREATE INDEX "monthly_budget_per_category_budget_category_id_idx" ON "monthly_budget_per_category"("budget_category_id");

-- CreateIndex
CREATE UNIQUE INDEX "monthly_budget_per_category_month_year_budget_category_id_key" ON "monthly_budget_per_category"("month", "year", "budget_category_id");

-- CreateIndex
CREATE INDEX "budget_category_group_budget_id_idx" ON "budget_category_group"("budget_id");

-- CreateIndex
CREATE UNIQUE INDEX "budget_category_group_name_budget_id_key" ON "budget_category_group"("name", "budget_id");

-- CreateIndex
CREATE INDEX "budget_category_budget_category_group_id_idx" ON "budget_category"("budget_category_group_id");

-- CreateIndex
CREATE UNIQUE INDEX "budget_category_name_budget_category_group_id_key" ON "budget_category"("name", "budget_category_group_id");

-- AddForeignKey
ALTER TABLE "account" ADD CONSTRAINT "account_budget_id_fkey" FOREIGN KEY ("budget_id") REFERENCES "budget"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "account" ADD CONSTRAINT "account_payee_id_fkey" FOREIGN KEY ("payee_id") REFERENCES "payee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payee" ADD CONSTRAINT "payee_budget_id_fkey" FOREIGN KEY ("budget_id") REFERENCES "budget"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_payee_id_fkey" FOREIGN KEY ("payee_id") REFERENCES "payee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_monthly_budget_per_category_id_fkey" FOREIGN KEY ("monthly_budget_per_category_id") REFERENCES "monthly_budget_per_category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "budget" ADD CONSTRAINT "budget_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "monthly_budget_per_category" ADD CONSTRAINT "monthly_budget_per_category_budget_category_id_fkey" FOREIGN KEY ("budget_category_id") REFERENCES "budget_category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "budget_category_group" ADD CONSTRAINT "budget_category_group_budget_id_fkey" FOREIGN KEY ("budget_id") REFERENCES "budget"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "budget_category" ADD CONSTRAINT "budget_category_budget_category_group_id_fkey" FOREIGN KEY ("budget_category_group_id") REFERENCES "budget_category_group"("id") ON DELETE CASCADE ON UPDATE CASCADE;
