export const schema = gql`
  type MonthlyBudgetPerCategory {
    id: String!
    month: Int!
    year: Int!
    assigned: Float!
    budgetCategory: BudgetCategory!
    budgetCategoryId: String!
    transactions: [Transaction]!
    monthlyCategoryActivity: MonthlyCategoryActivity
  }

  type Query {
    monthlyBudgetPerCategories: [MonthlyBudgetPerCategory!]! @requireAuth
    monthlyBudgetPerCategory(id: String!): MonthlyBudgetPerCategory @requireAuth
  }

  input UpdateAssignedBudgetForCategoryInput {
    assigned: Float!
  }

  input CreateEmptyBudgetForCategoriesInput {
    categoryIds: [String!]!
    month: Int!
    year: Int!
  }

  type Mutation {
    createEmptyBudgetForCategories(
      input: CreateEmptyBudgetForCategoriesInput!
    ): PrismaCreateManyResult! @requireAuth
    updateAssignedBudgetForCategory(
      categoryId: String!
      month: Int!
      year: Int!
      input: UpdateAssignedBudgetForCategoryInput!
    ): MonthlyBudgetPerCategory! @requireAuth
  }
`
