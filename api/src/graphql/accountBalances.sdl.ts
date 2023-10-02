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
    accountBalance(id: String!): AccountBalance @requireAuth
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

  type Mutation {
    createAccountBalance(input: CreateAccountBalanceInput!): AccountBalance!
      @requireAuth
    updateAccountBalance(
      id: String!
      input: UpdateAccountBalanceInput!
    ): AccountBalance! @requireAuth
    deleteAccountBalance(id: String!): AccountBalance! @requireAuth
  }
`
