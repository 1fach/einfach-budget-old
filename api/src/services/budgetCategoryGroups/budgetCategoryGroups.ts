import type {
  QueryResolvers,
  MutationResolvers,
  BudgetCategoryGroupRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const budgetCategoryGroups: QueryResolvers['budgetCategoryGroups'] =
  () => {
    return db.budgetCategoryGroup.findMany()
  }

export const budgetCategoryGroup: QueryResolvers['budgetCategoryGroup'] = ({
  id,
}) => {
  return db.budgetCategoryGroup.findUnique({
    where: { id },
  })
}

export const createBudgetCategoryGroup: MutationResolvers['createBudgetCategoryGroup'] =
  ({ input }) => {
    return db.budgetCategoryGroup.create({
      data: input,
    })
  }

export const updateBudgetCategoryGroup: MutationResolvers['updateBudgetCategoryGroup'] =
  ({ id, input }) => {
    return db.budgetCategoryGroup.update({
      data: input,
      where: { id },
    })
  }

export const deleteBudgetCategoryGroup: MutationResolvers['deleteBudgetCategoryGroup'] =
  ({ id }) => {
    return db.budgetCategoryGroup.delete({
      where: { id },
    })
  }

export const BudgetCategoryGroup: BudgetCategoryGroupRelationResolvers = {
  budget: (_obj, { root }) => {
    return db.budgetCategoryGroup
      .findUnique({ where: { id: root?.id } })
      .budget()
  },
  budgetCategories: (_obj, { root }) => {
    return db.budgetCategoryGroup
      .findUnique({ where: { id: root?.id } })
      .budgetCategories()
  },
  monthlyCategoryGroupActivities: (_obj, { root }) => {
    return db.budgetCategoryGroup
      .findUnique({ where: { id: root?.id } })
      .monthlyCategoryGroupActivities()
  },
}
