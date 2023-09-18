export const schema = gql`
  type Payee {
    id: Int!
    name: String!
    account: Account
    transactions: [Transaction]!
  }

  type Query {
    payees: [Payee!]! @requireAuth
    payee(id: Int!): Payee @requireAuth
  }

  input CreatePayeeInput {
    name: String!
  }

  input UpdatePayeeInput {
    name: String
  }

  type Mutation {
    createPayee(input: CreatePayeeInput!): Payee! @requireAuth
    updatePayee(id: Int!, input: UpdatePayeeInput!): Payee! @requireAuth
    deletePayee(id: Int!): Payee! @requireAuth
  }
`
