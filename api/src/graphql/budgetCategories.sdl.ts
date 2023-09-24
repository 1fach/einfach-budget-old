export const schema = gql`
  type BudgetCategory {
    id: String!
    name: String!
    sortOrder: Int!
    group: BudgetCategoryGroup!
    groupId: String!
    monthlyBudget: [MonthlyBudgetPerCategory]!
  }

  type Query {
    budgetCategories: [BudgetCategory!]! @requireAuth
    budgetCategory(id: String!): BudgetCategory @requireAuth
  }

  input CreateBudgetCategoryInput {
    name: String!
    sortOrder: Int!
    groupId: String!
  }

  input UpdateBudgetCategoryInput {
    name: String
    sortOrder: Int
    groupId: String
  }

  type Mutation {
    createBudgetCategory(input: CreateBudgetCategoryInput!): BudgetCategory!
      @requireAuth
    updateBudgetCategory(
      id: String!
      input: UpdateBudgetCategoryInput!
    ): BudgetCategory! @requireAuth
    deleteBudgetCategory(id: String!): BudgetCategory! @requireAuth
  }
`
