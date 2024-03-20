import type {
  QueryResolvers,
  MutationResolvers,
  BudgetRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'
import { nanoid } from 'src/lib/nanoid'

export const budgets: QueryResolvers['budgets'] = () => {
  return db.budget.findMany({ where: { userId: context.currentUser?.id } })
}

export const budget: QueryResolvers['budget'] = ({ id }) => {
  return db.budget.findUnique({
    where: { id, userId: context.currentUser?.id },
  })
}

export const budgetCreate: MutationResolvers['budgetCreate'] = ({ input }) => {
  return db.budget.create({
    data: {
      ...input,
      id: nanoid(),
      userId: context.currentUser?.id,
    },
  })
}

export const budgetRename: MutationResolvers['budgetRename'] = ({
  input: {
    filter: { id },
    update: data,
  },
}) => {
  return db.budget.update({
    data,
    where: { id, userId: context.currentUser?.id },
  })
}

export const Budget: BudgetRelationResolvers = {
  accounts: async (_obj, { root }) => {
    const inoutflows = await db.transaction.groupBy({
      by: ['accountId'],
      where: {
        account: {
          id: root?.id,
          budget: {
            userId: context.currentUser?.id,
          },
        },
      },
      _sum: {
        inflow: true,
        outflow: true,
      },
    })

    return (
      await db.budget.findUnique({ where: { id: root?.id } }).accounts()
    ).map((account) => {
      const accInOut = inoutflows.find(
        (balance) => balance.accountId === account.id
      )

      return {
        ...account,
        balance:
          Number(accInOut?._sum.inflow || 0.0) -
          Number(accInOut?._sum.outflow || 0.0),
      }
    })
  },
  payees: (_obj, { root }) => {
    return db.budget.findUnique({ where: { id: root?.id } }).payees()
  },
}
