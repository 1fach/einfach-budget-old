export const schema = gql`
  type Account {
    id: String!
    nickname: String!
    budget: Budget!
    budgetId: String!
    transactions: [Transaction]!
    accountBalance: AccountBalance
    payee: Payee
  }

  type Query {
    accounts: [Account!]! @requireAuth
    account(id: String!): Account @requireAuth
  }

  input CreateAccountInput {
    nickname: String!
    budgetId: String!
  }

  input UpdateAccountInput {
    nickname: String
    budgetId: String
  }

  type Mutation {
    createAccount(input: CreateAccountInput!): Account! @requireAuth
    updateAccount(id: String!, input: UpdateAccountInput!): Account!
      @requireAuth
    deleteAccount(id: String!): Account! @requireAuth
  }
`
