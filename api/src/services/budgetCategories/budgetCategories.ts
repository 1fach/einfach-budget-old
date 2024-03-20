import type { MutationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'
import { nanoid } from 'src/lib/nanoid'

export const budgetCategoryCreate: MutationResolvers['budgetCategoryCreate'] =
  ({ input }) => {
    return db.budgetCategory.create({
      data: {
        ...input,
        id: nanoid(),
      },
    })
  }

export const budgetCategoryUpdate: MutationResolvers['budgetCategoryUpdate'] =
  ({
    input: {
      filter: { id },
      update: data,
    },
  }) => {
    return db.budgetCategory.update({
      data,
      where: { id },
    })
  }
