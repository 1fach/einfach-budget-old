export const schema = gql`
  type BudgetCategory {
    id: Int!
    name: String!
    children: [BudgetCategory]!
    parent: BudgetCategory
    parentId: Int
    monthlyBudgetCategory: [MonthlyBudgetCategory]!
  }

  type Query {
    budgetCategories: [BudgetCategory!]! @requireAuth
    budgetCategory(id: Int!): BudgetCategory @requireAuth
  }

  input CreateBudgetCategoryInput {
    name: String!
    parentId: Int
  }

  input UpdateBudgetCategoryInput {
    name: String
    parentId: Int
  }

  type Mutation {
    createBudgetCategory(input: CreateBudgetCategoryInput!): BudgetCategory!
      @requireAuth
    updateBudgetCategory(
      id: Int!
      input: UpdateBudgetCategoryInput!
    ): BudgetCategory! @requireAuth
    deleteBudgetCategory(id: Int!): BudgetCategory! @requireAuth
  }
`
