export const schema = gql`
  type MonthlyBudgetCategory {
    id: Int!
    assigned: Int!
    activity: Int!
    available: Int!
    monthlyBudget: MonthlyBudget!
    monthlyBudgetId: Int!
    budgetCategory: BudgetCategory!
    budgetCategoryId: Int!
    transactions: [Transaction]!
  }

  type Query {
    monthlyBudgetCategories: [MonthlyBudgetCategory!]! @requireAuth
    monthlyBudgetCategory(id: Int!): MonthlyBudgetCategory @requireAuth
  }

  input CreateMonthlyBudgetCategoryInput {
    assigned: Int!
    activity: Int!
    available: Int!
    monthlyBudgetId: Int!
    budgetCategoryId: Int!
  }

  input UpdateMonthlyBudgetCategoryInput {
    assigned: Int
    activity: Int
    available: Int
    monthlyBudgetId: Int
    budgetCategoryId: Int
  }

  type Mutation {
    createMonthlyBudgetCategory(
      input: CreateMonthlyBudgetCategoryInput!
    ): MonthlyBudgetCategory! @requireAuth
    updateMonthlyBudgetCategory(
      id: Int!
      input: UpdateMonthlyBudgetCategoryInput!
    ): MonthlyBudgetCategory! @requireAuth
    deleteMonthlyBudgetCategory(id: Int!): MonthlyBudgetCategory! @requireAuth
  }
`
