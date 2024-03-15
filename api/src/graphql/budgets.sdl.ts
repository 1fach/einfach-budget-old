export const schema = gql`
  type Budget {
    id: ID!
    name: String!
    user: User!
    userId: String!
    accounts: [Account]!
    payees: [Payee]!
    budgetCategoryGroups: [BudgetCategoryGroup]!
  }

  type Query {
    budgets: [Budget!]! @requireAuth
    budget(id: String!): Budget @requireAuth
  }

  input CreateBudgetInput {
    name: String!
    userId: String!
  }

  input UpdateBudgetInput {
    name: String
    userId: String
  }

  type Mutation {
    createBudget(input: CreateBudgetInput!): Budget! @requireAuth
    updateBudget(id: String!, input: UpdateBudgetInput!): Budget! @requireAuth
    deleteBudget(id: String!): Budget! @requireAuth
  }
`
