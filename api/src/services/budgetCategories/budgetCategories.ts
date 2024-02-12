import type {
  QueryResolvers,
  MutationResolvers,
  BudgetCategoryRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const budgetCategories: QueryResolvers['budgetCategories'] = () => {
  return db.budgetCategory.findMany()
}

export const budgetCategory: QueryResolvers['budgetCategory'] = ({ id }) => {
  return db.budgetCategory.findUnique({
    where: { id },
  })
}

export const budgetCategoriesWithNoAssignedFor: QueryResolvers['budgetCategoriesWithNoAssignedFor'] =
  ({ budgetId, month, year }) => {
    return db.budgetCategory.findMany({
      where: {
        budgetCategoryGroup: {
          budget: {
            id: budgetId,
          },
        },
        NOT: {
          monthlyBudgetPerCategories: {
            some: {
              month,
              year,
            },
          },
        },
      },
    })
  }

export const createBudgetCategory: MutationResolvers['createBudgetCategory'] =
  ({ input }) => {
    return db.budgetCategory.create({
      data: input,
    })
  }

export const updateBudgetCategory: MutationResolvers['updateBudgetCategory'] =
  ({ id, input }) => {
    return db.budgetCategory.update({
      data: input,
      where: { id },
    })
  }

export const deleteBudgetCategory: MutationResolvers['deleteBudgetCategory'] =
  ({ id }) => {
    return db.budgetCategory.delete({
      where: { id },
    })
  }

export const BudgetCategory: BudgetCategoryRelationResolvers = {
  budgetCategoryGroup: (_obj, { root }) => {
    return db.budgetCategory
      .findUnique({ where: { id: root?.id } })
      .budgetCategoryGroup()
  },

  monthlyBudgetPerCategory: ({ month, year }, { root }) => {
    return db.budgetCategory
      .findUnique({ where: { id: root?.id } })
      .monthlyBudgetPerCategories({
        where: { month, year },
      })
  },

  monthlyBudgetPerCategories: (_obj, { root }) => {
    return db.budgetCategory
      .findUnique({ where: { id: root?.id } })
      .monthlyBudgetPerCategories()
  },
}
