export const schema = gql`
  type BudgetCategoryGroup {
    id: String!
    name: String!
    sortOrder: Int!
    budget: Budget!
    budgetId: String!
    budgetCategory: [BudgetCategory]!
  }

  type Query {
    budgetCategoryGroups: [BudgetCategoryGroup!]! @requireAuth
    budgetCategoryGroup(id: String!): BudgetCategoryGroup @requireAuth
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
    deleteBudgetCategoryGroup(id: String!): BudgetCategoryGroup! @requireAuth
  }
`
