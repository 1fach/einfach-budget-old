export const schema = gql`
  type Transaction {
    id: ID!
    description: String!
    date: DateTime!
    outflow: Money!
    inflow: Money!
    cleared: Boolean!
    accountId: String!
    payeeId: String
    monthlyBudgetPerCategoryId: String!
  }

  type Query {
    transactions(accountId: String!): [Transaction!]! @requireAuth
    transaction(id: String!): Transaction @requireAuth
  }

  input TransactionCreateInput {
    description: String!
    date: DateTime!
    outflow: Money!
    inflow: Money!
    cleared: Boolean!
    accountId: String!
    payeeId: String
    monthlyBudgetPerCategoryId: String!
  }

  input TransactionUpdateFilter {
    id: String!
  }

  input TransactionUpdateData {
    description: String
    date: DateTime
    outflow: Money
    inflow: Money
    cleared: Boolean
    accountId: String
    payeeId: String
    monthlyBudgetPerCategoryId: String
  }

  input TransactionUpdateInput {
    filter: TransactionUpdateFilter!
    update: TransactionUpdateData!
  }

  type Mutation {
    transactionCreate(input: TransactionCreateInput!): Transaction! @requireAuth
    transactionUpdate(input: TransactionUpdateInput!): Transaction! @requireAuth
  }
`
