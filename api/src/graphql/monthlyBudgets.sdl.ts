export const schema = gql`
  type MonthlyBudget {
    id: ID! # budgetId + year + month as a unique identifier.
    name: String!
    userId: String!
    month: Int!
    year: Int!
    readyToAssign: Float!
    groups: [MonthlyBudgetGroup!]
  }

  type Query {
    monthlyBudget(id: String!, month: Int!, year: Int!): MonthlyBudget!
      @requireAuth
  }

  input MonthlyBudgetInitInput {
    budgetId: String!
    month: Int!
    year: Int!
  }

  type MonthlyBudgetInitPayload {
    categories: [MonthlyBudgetCategory!]
  }

  input MonthlyBudgetAssignInput {
    categoryId: String!
    month: Int!
    year: Int!
    assigned: Float!
  }

  type MonthlyBudgetAssignPayload {
    category: MonthlyBudgetCategory!
  }

  type Mutation {
    monthlyBudgetInit(
      input: MonthlyBudgetInitInput!
    ): MonthlyBudgetInitPayload! @requireAuth
    monthlyBudgetAssign(
      input: MonthlyBudgetAssignInput!
    ): MonthlyBudgetAssignPayload! @requireAuth
  }
`
