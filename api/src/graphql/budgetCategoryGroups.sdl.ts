export const schema = gql`
  type BudgetCategoryGroup {
    id: ID!
    name: String!
    sortOrder: Int!
    budgetId: String!
  }

  input BudgetCategoryGroupCreateInput {
    name: String!
    sortOrder: Int!
    budgetId: String!
  }

  input BudgetCategoryGroupUpdateFilter {
    id: String!
  }

  input BudgetCategoryGroupUpdateData {
    name: String
    sortOrder: Int
  }

  input BudgetCategoryGroupUpdateInput {
    filter: BudgetCategoryGroupUpdateFilter!
    update: BudgetCategoryGroupUpdateData!
  }

  type Mutation {
    budgetCategoryGroupCreate(
      input: BudgetCategoryGroupCreateInput!
    ): BudgetCategoryGroup! @requireAuth
    budgetCategoryGroupUpdate(
      input: BudgetCategoryGroupUpdateInput!
    ): BudgetCategoryGroup! @requireAuth
  }
`
