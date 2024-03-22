export const schema = gql`
  type MonthlyBudgetCategory {
    id: ID! # budgetCategoryId + year + month as a unique identifier.
    name: String!
    sortOrder: Int!
    month: Int!
    year: Int!
    assigned: Money!
    activity: Money!
    available: Money!
  }
`
