export const schema = gql`
  interface BudgetCategory {
    id: ID!
    name: String!
    sortOrder: Int!
    budgetCategoryGroupId: String!
  }

  input BudgetCategoryCreateInput {
    name: String!
    sortOrder: Int!
    budgetCategoryGroupId: String!
  }

  input BudgetCategoryUpdateFilter {
    id: String!
  }

  input BudgetCategoryUpdateData {
    name: String
    sortOrder: Int
    budgetCategoryGroupId: String
  }

  input BudgetCategoryUpdateInput {
    filter: BudgetCategoryUpdateFilter!
    update: BudgetCategoryUpdateData!
  }

  type Mutation {
    budgetCategoryCreate(input: BudgetCategoryCreateInput!): BudgetCategory!
      @requireAuth
    budgetCategoryUpdate(input: BudgetCategoryUpdateInput!): BudgetCategory!
      @requireAuth
  }
`
