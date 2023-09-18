export const schema = gql`
  type Account {
    id: Int!
    nickname: String!
    cleared_balance: Int!
    uncleared_balance: Int!
    transactions: [Transaction]!
    payee: Payee!
    payeeId: Int!
    budget: Budget
    budgetId: Int
  }

  type Query {
    accounts: [Account!]! @requireAuth
    account(id: Int!): Account @requireAuth
  }

  input CreateAccountInput {
    nickname: String!
    cleared_balance: Int!
    uncleared_balance: Int!
    payeeId: Int!
    budgetId: Int
  }

  input UpdateAccountInput {
    nickname: String
    cleared_balance: Int
    uncleared_balance: Int
    payeeId: Int
    budgetId: Int
  }

  type Mutation {
    createAccount(input: CreateAccountInput!): Account! @requireAuth
    updateAccount(id: Int!, input: UpdateAccountInput!): Account! @requireAuth
    deleteAccount(id: Int!): Account! @requireAuth
  }
`
