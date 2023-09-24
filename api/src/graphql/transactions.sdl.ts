export const schema = gql`
  type Transaction {
    id: String!
    description: String!
    date: DateTime!
    outflow: Float!
    inflow: Float!
    cleared: Boolean!
    account: Account!
    accountId: String!
    payee: Payee
    payeeId: String
    monthlyBudgetPerCategory: MonthlyBudgetPerCategory!
    monthlyBudgetPerCategoryId: String!
  }

  type Query {
    transactions: [Transaction!]! @requireAuth
    transaction(id: String!): Transaction @requireAuth
  }

  input CreateTransactionInput {
    description: String!
    date: DateTime!
    outflow: Float!
    inflow: Float!
    cleared: Boolean!
    accountId: String!
    payeeId: String
    monthlyBudgetPerCategoryId: String!
  }

  input UpdateTransactionInput {
    description: String
    date: DateTime
    outflow: Float
    inflow: Float
    cleared: Boolean
    accountId: String
    payeeId: String
    monthlyBudgetPerCategoryId: String
  }

  type Mutation {
    createTransaction(input: CreateTransactionInput!): Transaction! @requireAuth
    updateTransaction(
      id: String!
      input: UpdateTransactionInput!
    ): Transaction! @requireAuth
    deleteTransaction(id: String!): Transaction! @requireAuth
  }
`
