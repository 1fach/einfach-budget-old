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

export const createMonthlyBudgetPerCategory: MutationResolvers['createMonthlyBudgetPerCategory'] =
  ({ input }) => {
    return db.monthlyBudgetPerCategory.create({
      data: input,
    })
  }

export const updateMonthlyBudgetPerCategory: MutationResolvers['updateMonthlyBudgetPerCategory'] =
  ({ id, input }) => {
    return db.monthlyBudgetPerCategory.update({
      data: input,
      where: { id },
    })
  }

export const deleteMonthlyBudgetPerCategory: MutationResolvers['deleteMonthlyBudgetPerCategory'] =
  ({ id }) => {
    return db.monthlyBudgetPerCategory.delete({
      where: { id },
    })
  }

export const MonthlyBudgetPerCategory: MonthlyBudgetPerCategoryRelationResolvers =
  {
    budgetCategory: (_obj, { root }) => {
      return db.monthlyBudgetPerCategory
        .findUnique({ where: { id: root?.id } })
        .budgetCategory()
    },
    transactions: (_obj, { root }) => {
      return db.monthlyBudgetPerCategory
        .findUnique({ where: { id: root?.id } })
        .transactions()
    },
  }
