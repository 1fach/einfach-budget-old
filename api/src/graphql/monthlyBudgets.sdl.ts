export const schema = gql`
  type MonthlyBudget {
    id: Int!
    month: Int!
    year: Int!
    budget: Budget!
    budgetId: Int!
    budgetCategories: [MonthlyBudgetCategory]!
  }

  type Query {
    monthlyBudgets: [MonthlyBudget!]! @requireAuth
    monthlyBudget(id: Int!): MonthlyBudget @requireAuth
  }

  input CreateMonthlyBudgetInput {
    month: Int!
    year: Int!
    budgetId: Int!
  }

  input UpdateMonthlyBudgetInput {
    month: Int
    year: Int
    budgetId: Int
  }

  type Mutation {
    createMonthlyBudget(input: CreateMonthlyBudgetInput!): MonthlyBudget!
      @requireAuth
    updateMonthlyBudget(
      id: Int!
      input: UpdateMonthlyBudgetInput!
    ): MonthlyBudget! @requireAuth
    deleteMonthlyBudget(id: Int!): MonthlyBudget! @requireAuth
  }
`
