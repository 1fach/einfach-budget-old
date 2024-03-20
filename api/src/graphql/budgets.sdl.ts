export const schema = gql`
  type Budget {
    id: ID!
    name: String!
    userId: String!
    accounts: [Account]!
    payees: [Payee]!
  }

  type Query {
    budgets: [Budget!]! @requireAuth
    budget(id: String!): Budget @requireAuth
  }

  input BudgetCreateInput {
    name: String!
  }

  input BudgetInputRename {
    id: String!
    name: String
  }

  type Mutation {
    budgetCreate(input: BudgetCreateInput!): Budget! @requireAuth
    budgetRename(input: BudgetInputRename!): Budget! @requireAuth
  }
`
