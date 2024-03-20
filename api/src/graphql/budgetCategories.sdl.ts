export const schema = gql`
  interface BudgetCategory {
    id: ID!
    name: String!
    sortOrder: Int!
    budgetCategoryGroupId: String!
  }

  input CreateBudgetCategoryInput {
    name: String!
    sortOrder: Int!
    budgetCategoryGroupId: String!
  }

  input UpdateBudgetCategoryInput {
    name: String
    sortOrder: Int
    budgetCategoryGroupId: String
  }

  type Mutation {
    createBudgetCategory(input: CreateBudgetCategoryInput!): BudgetCategory!
      @requireAuth
    updateBudgetCategory(
      id: String!
      input: UpdateBudgetCategoryInput!
    ): BudgetCategory! @requireAuth
  }
`
