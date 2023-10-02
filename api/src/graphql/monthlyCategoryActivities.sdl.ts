export const schema = gql`
  type MonthlyCategoryActivity {
    activity: Float!
    available: Float!
    monthlyBudgetPerCategory: MonthlyBudgetPerCategory!
    monthlyBudgetPerCategoryId: String!
  }

  type Query {
    monthlyCategoryActivities: [MonthlyCategoryActivity!]! @requireAuth
    monthlyCategoryActivity(id: String!): MonthlyCategoryActivity @requireAuth
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

  type Mutation {
    createMonthlyCategoryActivity(
      input: CreateMonthlyCategoryActivityInput!
    ): MonthlyCategoryActivity! @requireAuth
    updateMonthlyCategoryActivity(
      id: String!
      input: UpdateMonthlyCategoryActivityInput!
    ): MonthlyCategoryActivity! @requireAuth
    deleteMonthlyCategoryActivity(id: String!): MonthlyCategoryActivity!
      @requireAuth
  }
`
