import type {
  QueryResolvers,
  MutationResolvers,
  MonthlyBudgetPerCategoryRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const monthlyBudgetPerCategories: QueryResolvers['monthlyBudgetPerCategories'] =
  () => {
    return db.monthlyBudgetPerCategory.findMany()
  }

export const monthlyBudgetPerCategory: QueryResolvers['monthlyBudgetPerCategory'] =
  ({ id }) => {
    return db.monthlyBudgetPerCategory.findUnique({
      where: { id },
    })
  }

export const createEmptyBudgetForCategories: MutationResolvers['createEmptyBudgetForCategories'] =
  ({ input }) => {
    const { categoryIds, month, year } = input
    return db.monthlyBudgetPerCategory.createMany({
      data: categoryIds.map((budgetCategoryId) => ({
        budgetCategoryId,
        month,
        year,
        assigned: 0,
      })),
    })
  }

export const updateAssignedBudgetForCategory: MutationResolvers['updateAssignedBudgetForCategory'] =
  ({ categoryId, month, year, input }) => {
    const { assigned } = input
    return db.monthlyBudgetPerCategory.update({
      data: { assigned },
      where: {
        month_year_budgetCategoryId: {
          month,
          year,
          budgetCategoryId: categoryId,
        },
      },
    })
  }

export const MonthlyBudgetPerCategory: MonthlyBudgetPerCategoryRelationResolvers =
  {
    budgetCategory: (_obj, { root }) => {
      return root.budgetCategory
    },
    transactions: (_obj, { root }) => {
      return db.monthlyBudgetPerCategory
        .findUnique({ where: { id: root?.id } })
        .transactions()
    },
  }
