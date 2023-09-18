import type {
  QueryResolvers,
  MutationResolvers,
  MonthlyBudgetCategoryRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const monthlyBudgetCategories: QueryResolvers['monthlyBudgetCategories'] =
  () => {
    return db.monthlyBudgetCategory.findMany()
  }

export const monthlyBudgetCategory: QueryResolvers['monthlyBudgetCategory'] = ({
  id,
}) => {
  return db.monthlyBudgetCategory.findUnique({
    where: { id },
  })
}

export const createMonthlyBudgetCategory: MutationResolvers['createMonthlyBudgetCategory'] =
  ({ input }) => {
    return db.monthlyBudgetCategory.create({
      data: input,
    })
  }

export const updateMonthlyBudgetCategory: MutationResolvers['updateMonthlyBudgetCategory'] =
  ({ id, input }) => {
    return db.monthlyBudgetCategory.update({
      data: input,
      where: { id },
    })
  }

export const deleteMonthlyBudgetCategory: MutationResolvers['deleteMonthlyBudgetCategory'] =
  ({ id }) => {
    return db.monthlyBudgetCategory.delete({
      where: { id },
    })
  }

export const MonthlyBudgetCategory: MonthlyBudgetCategoryRelationResolvers = {
  monthlyBudget: (_obj, { root }) => {
    return db.monthlyBudgetCategory
      .findUnique({ where: { id: root?.id } })
      .monthlyBudget()
  },
  budgetCategory: (_obj, { root }) => {
    return db.monthlyBudgetCategory
      .findUnique({ where: { id: root?.id } })
      .budgetCategory()
  },
  transactions: (_obj, { root }) => {
    return db.monthlyBudgetCategory
      .findUnique({ where: { id: root?.id } })
      .transactions()
  },
}
