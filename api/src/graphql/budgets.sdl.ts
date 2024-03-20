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

  input BudgetRenameFilter {
    id: String!
  }

  input BudgetRenameData {
    name: String
  }

  input BudgetRenameInput {
    filter: BudgetRenameFilter!
    update: BudgetRenameData!
  }

  type Mutation {
    budgetCreate(input: BudgetCreateInput!): Budget! @requireAuth
    budgetRename(input: BudgetRenameInput!): Budget! @requireAuth
  }
`
