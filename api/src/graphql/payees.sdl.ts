export const schema = gql`
  type Payee {
    id: ID!
    name: String!
    budgetId: String!
    transactions: [Transaction]!
  }

  type Query {
    payees(budgetId: String!): [Payee!]! @requireAuth
    payee(id: String!): Payee @requireAuth
  }

  input PayeeCreateInput {
    name: String!
    budgetId: String!
  }

  input PayeeUpdateFilter {
    id: String!
  }

  input PayeeUpdateData {
    name: String
  }

  input PayeeUpdateInput {
    filter: PayeeUpdateFilter!
    update: PayeeUpdateData!
  }

  type Mutation {
    payeeCreate(input: PayeeCreateInput!): Payee! @requireAuth
    payeeUpdate(input: PayeeUpdateInput!): Payee! @requireAuth
  }
`
