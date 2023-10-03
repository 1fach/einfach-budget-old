import type {
  QueryResolvers,
  MonthlyCategoryActivityRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const monthlyCategoryActivities: QueryResolvers['monthlyCategoryActivities'] =
  () => {
    return db.monthlyCategoryActivity.findMany()
  }

export const MonthlyCategoryActivity: MonthlyCategoryActivityRelationResolvers =
  {
    monthlyBudgetPerCategory: (_obj, { root }) => {
      return db.monthlyCategoryActivity
        .findUnique({
          where: {
            monthlyBudgetPerCategoryId: root?.monthlyBudgetPerCategoryId,
          },
        })
        .monthlyBudgetPerCategory()
    },
  }
