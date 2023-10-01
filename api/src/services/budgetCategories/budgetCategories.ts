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
  group: (_obj, { root }) => {
    return db.budgetCategory.findUnique({ where: { id: root?.id } }).group()
  },
  monthlyBudgets: (_obj, { root }) => {
    return db.budgetCategory
      .findUnique({ where: { id: root?.id } })
      .monthlyBudgets()
  },
}
