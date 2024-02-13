export const schema = gql`
  type MonthlyBudgetCategory {
    id: String!
    name: String!
    month: Int!
    year: Int!
    assigned: Float!
    activity: Float!
    available: Float!
  }

  type MonthlyBudgetGroup {
    id: String!
    name: String!
    month: Int!
    year: Int!
    assigned: Float!
    activity: Float!
    available: Float!
    subRows: [MonthlyBudgetCategory!]
  }

  type Query {
    monthlyBudget(
      id: String!
      userId: String!
      month: Int!
      year: Int!
    ): [MonthlyBudgetGroup!]! @requireAuth
  }
`
