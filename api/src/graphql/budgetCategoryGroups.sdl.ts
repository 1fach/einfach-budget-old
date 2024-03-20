export const schema = gql`
  type BudgetCategoryGroup {
    id: ID!
    name: String!
    sortOrder: Int!
    budgetId: String!
  }

  input CreateBudgetCategoryGroupInput {
    name: String!
    sortOrder: Int!
    budgetId: String!
  }

  input UpdateBudgetCategoryGroupInput {
    name: String
    sortOrder: Int
    budgetId: String
  }

  type Mutation {
    createBudgetCategoryGroup(
      input: CreateBudgetCategoryGroupInput!
    ): BudgetCategoryGroup! @requireAuth
    updateBudgetCategoryGroup(
      id: String!
      input: UpdateBudgetCategoryGroupInput!
    ): BudgetCategoryGroup! @requireAuth
  }
`
