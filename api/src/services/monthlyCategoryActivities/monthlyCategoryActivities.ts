import type {
  QueryResolvers,
  MutationResolvers,
  MonthlyCategoryActivityRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const monthlyCategoryActivities: QueryResolvers['monthlyCategoryActivities'] =
  () => {
    return db.monthlyCategoryActivity.findMany()
  }

export const monthlyCategoryActivity: QueryResolvers['monthlyCategoryActivity'] =
  ({ id }) => {
    return db.monthlyCategoryActivity.findUnique({
      where: { id },
    })
  }

export const createMonthlyCategoryActivity: MutationResolvers['createMonthlyCategoryActivity'] =
  ({ input }) => {
    return db.monthlyCategoryActivity.create({
      data: input,
    })
  }

export const updateMonthlyCategoryActivity: MutationResolvers['updateMonthlyCategoryActivity'] =
  ({ id, input }) => {
    return db.monthlyCategoryActivity.update({
      data: input,
      where: { id },
    })
  }

export const deleteMonthlyCategoryActivity: MutationResolvers['deleteMonthlyCategoryActivity'] =
  ({ id }) => {
    return db.monthlyCategoryActivity.delete({
      where: { id },
    })
  }

export const MonthlyCategoryActivity: MonthlyCategoryActivityRelationResolvers =
  {
    monthlyBudgetPerCategory: (_obj, { root }) => {
      return db.monthlyCategoryActivity
        .findUnique({ where: { id: root?.id } })
        .monthlyBudgetPerCategory()
    },
  }
