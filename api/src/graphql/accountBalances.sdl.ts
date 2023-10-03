export const schema = gql`
  type AccountBalance {
    clearedBalance: Float!
    unclearedBalance: Float!
    workingBalance: Float!
    account: Account!
    accountId: String!
  }

  type Query {
    accountBalances: [AccountBalance!]! @requireAuth
  }

  input CreateAccountBalanceInput {
    clearedBalance: Float!
    unclearedBalance: Float!
    workingBalance: Float!
    accountId: String!
  }

  input UpdateAccountBalanceInput {
    clearedBalance: Float
    unclearedBalance: Float
    workingBalance: Float
    accountId: String
  }
`
