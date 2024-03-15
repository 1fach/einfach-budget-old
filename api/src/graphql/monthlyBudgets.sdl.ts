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
    categories: [MonthlyBudgetCategory!]
  }

  type MonthlyBudget {
    id: String!
    userId: String!
    name: String!
    month: Int!
    year: Int!
    readyToAssign: Float!
    groups: [MonthlyBudgetGroup!]
  }

  type Query {
    monthlyBudget(id: String!, month: Int!, year: Int!): MonthlyBudget
      @requireAuth
  }
`
