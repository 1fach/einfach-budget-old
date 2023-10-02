export const schema = gql`
  type MonthlyBudgetPerCategory {
    id: String!
    month: Int!
    year: Int!
    assigned: Float!
    budgetCategory: BudgetCategory!
    budgetCategoryId: String!
    transactions: [Transaction]!
    budgetActivity: MonthlyCategoryActivity
  }

  type Query {
    monthlyBudgetPerCategories: [MonthlyBudgetPerCategory!]! @requireAuth
    monthlyBudgetPerCategory(id: String!): MonthlyBudgetPerCategory @requireAuth
  }

  input CreateMonthlyBudgetPerCategoryInput {
    month: Int!
    year: Int!
    assigned: Float!
    budgetCategoryId: String!
  }

  input UpdateMonthlyBudgetPerCategoryInput {
    month: Int
    year: Int
    assigned: Float
    budgetCategoryId: String
  }

  type Mutation {
    createMonthlyBudgetPerCategory(
      input: CreateMonthlyBudgetPerCategoryInput!
    ): MonthlyBudgetPerCategory! @requireAuth
    updateMonthlyBudgetPerCategory(
      id: String!
      input: UpdateMonthlyBudgetPerCategoryInput!
    ): MonthlyBudgetPerCategory! @requireAuth
    deleteMonthlyBudgetPerCategory(id: String!): MonthlyBudgetPerCategory!
      @requireAuth
  }
`
