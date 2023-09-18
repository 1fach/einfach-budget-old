export const schema = gql`
  type Transaction {
    id: Int!
    description: String!
    date: DateTime!
    outflow: Int!
    inflow: Int!
    account: Account!
    accountId: Int!
    payee: Payee
    payeeId: Int
    cleared: Boolean!
    budgetCategory: MonthlyBudgetCategory!
    budgetCategoryId: Int!
  }

  type Query {
    transactions: [Transaction!]! @requireAuth
    transaction(id: Int!): Transaction @requireAuth
  }

  input CreateTransactionInput {
    description: String!
    date: DateTime!
    outflow: Int!
    inflow: Int!
    accountId: Int!
    payeeId: Int
    cleared: Boolean!
    budgetCategoryId: Int!
  }

  input UpdateTransactionInput {
    description: String
    date: DateTime
    outflow: Int
    inflow: Int
    accountId: Int
    payeeId: Int
    cleared: Boolean
    budgetCategoryId: Int
  }

  type Mutation {
    createTransaction(input: CreateTransactionInput!): Transaction! @requireAuth
    updateTransaction(id: Int!, input: UpdateTransactionInput!): Transaction!
      @requireAuth
    deleteTransaction(id: Int!): Transaction! @requireAuth
  }
`
