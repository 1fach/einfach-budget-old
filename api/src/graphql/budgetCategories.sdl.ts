export const schema = gql`
  type BudgetCategory {
    id: String!
    name: String!
    sortOrder: Int!
    budgetCategoryGroup: BudgetCategoryGroup!
    budgetCategoryGroupId: String!
    monthlyBudgetPerCategory(
      month: Int!
      year: Int!
    ): [MonthlyBudgetPerCategory!]!
    monthlyBudgetPerCategories: [MonthlyBudgetPerCategory!]!
  }

  type Query {
    budgetCategories: [BudgetCategory!]! @requireAuth
    budgetCategory(id: String!): BudgetCategory @requireAuth
    budgetCategoriesWithNoAssignedFor(budgetId:String!, month: Int!, year: Int!): [BudgetCategory!]! @requireAuth
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
    deleteBudgetCategory(id: String!): BudgetCategory! @requireAuth
  }
`
