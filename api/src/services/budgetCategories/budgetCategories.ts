import type { MutationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'
import { nanoid } from 'src/lib/nanoid'

export const createBudgetCategory: MutationResolvers['createBudgetCategory'] =
  ({ input }) => {
    return db.budgetCategory.create({
      data: {
        ...input,
        id: nanoid(),
      },
    })
  }

export const updateBudgetCategory: MutationResolvers['updateBudgetCategory'] =
  ({ id, input }) => {
    return db.budgetCategory.update({
      data: input,
      where: { id },
    })
  }
