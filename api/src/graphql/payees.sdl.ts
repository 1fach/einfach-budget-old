export const schema = gql`
  type Payee {
    id: String!
    name: String!
    budget: Budget!
    budgetId: String!
    account: Account
    accountId: String
    transactions: [Transaction]!
  }

  type Query {
    payees: [Payee!]! @requireAuth
    payee(id: String!): Payee @requireAuth
  }

  input CreatePayeeInput {
    name: String!
    budgetId: String!
    accountId: String
  }

  input UpdatePayeeInput {
    name: String
    budgetId: String
    accountId: String
  }

  type Mutation {
    createPayee(input: CreatePayeeInput!): Payee! @requireAuth
    updatePayee(id: String!, input: UpdatePayeeInput!): Payee! @requireAuth
    deletePayee(id: String!): Payee! @requireAuth
  }
`
