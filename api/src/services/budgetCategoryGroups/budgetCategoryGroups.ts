import type { MutationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'
import { nanoid } from 'src/lib/nanoid'

export const budgetCategoryGroupCreate: MutationResolvers['budgetCategoryGroupCreate'] =
  ({ input }) => {
    return db.budgetCategoryGroup.create({
      data: {
        ...input,
        id: nanoid(),
      },
    })
  }

export const budgetCategoryGroupUpdate: MutationResolvers['budgetCategoryGroupUpdate'] =
  ({
    input: {
      filter: { id },
      update: data,
    },
  }) => {
    return db.budgetCategoryGroup.update({
      data,
      where: { id },
    })
  }
