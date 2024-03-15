export const schema = gql`
  type Account {
    id: ID!
    nickname: String!
    balance: Float
    budget: Budget!
    budgetId: String!
    payee: Payee!
    payeeId: String!
    transactions: [Transaction]!
  }

  type Query {
    accounts(budgetId: String!): [Account!]! @requireAuth
    account(id: String!): Account @requireAuth
  }

  input CreateAccountInput {
    nickname: String!
    budgetId: String!
    payeeId: String!
  }

  input UpdateAccountInput {
    nickname: String
    budgetId: String
    payeeId: String
  }

  type Mutation {
    createAccount(input: CreateAccountInput!): Account! @requireAuth
    updateAccount(id: String!, input: UpdateAccountInput!): Account!
      @requireAuth
    deleteAccount(id: String!): Account! @requireAuth
  }
`
