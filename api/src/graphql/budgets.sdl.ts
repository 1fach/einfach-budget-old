export const schema = gql`
  type Budget {
    id: Int!
    name: String!
    accounts: [Account]!
    user: User!
    userId: Int!
    monthlyBudgets: [MonthlyBudget]!
  }

  type Query {
    budgets: [Budget!]! @requireAuth
    budget(id: Int!): Budget @requireAuth
  }

  input CreateBudgetInput {
    name: String!
    userId: Int!
  }

  input UpdateBudgetInput {
    name: String
    userId: Int
  }

  type Mutation {
    createBudget(input: CreateBudgetInput!): Budget! @requireAuth
    updateBudget(id: Int!, input: UpdateBudgetInput!): Budget! @requireAuth
    deleteBudget(id: Int!): Budget! @requireAuth
  }
`
