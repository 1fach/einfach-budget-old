import type { ColumnType } from 'kysely'
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>
export type Timestamp = ColumnType<Date, Date | string, Date | string>

export type Account = {
  id: string
  nickname: string
  budget_id: string
  payee_id: string
}
export type Budget = {
  id: string
  name: string
  user_id: string
}
export type BudgetCategory = {
  id: string
  name: string
  sort_order: number
  budget_category_group_id: string
}
export type BudgetCategoryGroup = {
  id: string
  name: string
  sort_order: number
  budget_id: string
}
export type MonthlyBudgetPerCategory = {
  id: string
  month: number
  year: number
  assigned: Generated<number>
  budget_category_id: string
}
export type Payee = {
  id: string
  name: string
  budget_id: string
}
export type Transaction = {
  id: string
  description: string
  date: Generated<Timestamp>
  outflow: Generated<number>
  inflow: Generated<number>
  cleared: Generated<boolean>
  updated_at: Timestamp
  account_id: string
  payee_id: string | null
  monthly_budget_per_category_id: string
}
export type User = {
  id: string
  name: string | null
  email: string
  hashed_password: string
  salt: string
  reset_token: string | null
  reset_token_expires_at: Timestamp | null
}
export type DB = {
  account: Account
  budget: Budget
  budget_category: BudgetCategory
  budget_category_group: BudgetCategoryGroup
  monthly_budget_per_category: MonthlyBudgetPerCategory
  payee: Payee
  transaction: Transaction
  user: User
}
