export const schema = gql`
  type User {
    id: ID!
    name: String
    email: String!
    budgets: [Budget]!
  }

  type Query {
    user: User @requireAuth
  }

  input UserUpdateData {
    name: String
    email: String
  }

  input UserUpdateInput {
    update: PayeeUpdateData!
  }

  type Mutation {
    userUpdate(input: UserUpdateInput!): User! @requireAuth
  }
`
