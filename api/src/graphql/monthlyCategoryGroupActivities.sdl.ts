export const schema = gql`
  type MonthlyCategoryGroupActivity {
    month: Int!
    year: Int!
    assigned: Float!
    activity: Float!
    available: Float!
    budgetCategoryGroup: BudgetCategoryGroup!
    budgetCategoryGroupId: String!
  }

  type Query {
    monthlyCategoryGroupActivities: [MonthlyCategoryGroupActivity!]!
      @requireAuth
  }

  input CreateMonthlyCategoryGroupActivityInput {
    month: Int!
    year: Int!
    assigned: Float!
    activity: Float!
    available: Float!
    budgetCategoryGroupId: String!
  }

  input UpdateMonthlyCategoryGroupActivityInput {
    month: Int
    year: Int
    assigned: Float
    activity: Float
    available: Float
    budgetCategoryGroupId: String
  }
`
