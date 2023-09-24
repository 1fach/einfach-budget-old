export const schema = gql`
  type Payee {
    id: String!
    name: String!
    account: Account
    transactions: [Transaction]!
  }

  type Query {
    payees: [Payee!]! @requireAuth
    payee(id: String!): Payee @requireAuth
  }

  input CreatePayeeInput {
    name: String!
  }

  input UpdatePayeeInput {
    name: String
  }

  type Mutation {
    createPayee(input: CreatePayeeInput!): Payee! @requireAuth
    updatePayee(id: String!, input: UpdatePayeeInput!): Payee! @requireAuth
    deletePayee(id: String!): Payee! @requireAuth
  }
`
