import type {
  QueryResolvers,
  MonthlyCategoryGroupActivityRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const monthlyCategoryGroupActivities: QueryResolvers['monthlyCategoryGroupActivities'] =
  () => {
    return db.monthlyCategoryGroupActivity.findMany()
  }

export const MonthlyCategoryGroupActivity: MonthlyCategoryGroupActivityRelationResolvers =
  {
    budgetCategoryGroup: (_obj, { root }) => {
      return db.monthlyCategoryGroupActivity
        .findUnique({
          where: {
            month_year_budgetCategoryGroupId: {
              budgetCategoryGroupId: root?.budgetCategoryGroupId,
              month: root?.month,
              year: root?.year,
            },
          },
        })
        .budgetCategoryGroup()
    },
  }
