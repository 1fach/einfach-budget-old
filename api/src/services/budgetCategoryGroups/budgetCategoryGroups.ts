import type { MutationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'
import { nanoid } from 'src/lib/nanoid'

export const createBudgetCategoryGroup: MutationResolvers['createBudgetCategoryGroup'] =
  ({ input }) => {
    return db.budgetCategoryGroup.create({
      data: {
        ...input,
        id: nanoid(),
      },
    })
  }

export const updateBudgetCategoryGroup: MutationResolvers['updateBudgetCategoryGroup'] =
  ({ id, input }) => {
    return db.budgetCategoryGroup.update({
      data: input,
      where: { id },
    })
  }
