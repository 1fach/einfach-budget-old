export const schema = gql`
  type MonthlyCategoryActivity {
    activity: Float!
    available: Float!
    monthlyBudgetPerCategory: MonthlyBudgetPerCategory!
    monthlyBudgetPerCategoryId: String!
  }

  type Query {
    monthlyCategoryActivities: [MonthlyCategoryActivity!]! @requireAuth
  }

  input CreateMonthlyCategoryActivityInput {
    activity: Float!
    available: Float!
    monthlyBudgetPerCategoryId: String!
  }

  input UpdateMonthlyCategoryActivityInput {
    activity: Float
    available: Float
    monthlyBudgetPerCategoryId: String
  }
`
