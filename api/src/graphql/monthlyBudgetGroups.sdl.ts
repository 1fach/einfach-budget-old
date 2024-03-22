export const schema = gql`
  type MonthlyBudgetGroup {
    id: ID! # budgetCategoryGroupId + year + month as a unique identifier.
    name: String!
    sortOrder: Int!
    month: Int!
    year: Int!
    assigned: Money!
    activity: Money!
    available: Money!
    categories: [MonthlyBudgetCategory!]
  }
`
