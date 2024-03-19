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

  input UpdateUserInput {
    name: String
    email: String
  }

  type Mutation {
    updateUser(input: UpdateUserInput!): User! @requireAuth
  }
`
