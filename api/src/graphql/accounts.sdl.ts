export const schema = gql`
  type Account {
    id: ID!
    nickname: String!
    balance: Float!
    budgetId: String!
    payeeId: String!
    transactions: [Transaction]!
  }

  type Query {
    accounts(budgetId: String!): [Account!]! @requireAuth
    account(id: String!): Account @requireAuth
  }

  input AccountCreateInput {
    nickname: String!
    budgetId: String!
    payeeId: String!
  }

  input AccountUpdateFilter {
    id: String!
  }

  input AccountUpdateData {
    nickname: String
  }

  input AccountUpdateInput {
    filter: AccountUpdateFilter!
    update: AccountUpdateData!
  }

  type Mutation {
    accountCreate(input: AccountCreateInput!): Account! @requireAuth
    accountUpdate(input: AccountUpdateInput!): Account! @requireAuth
  }
`
