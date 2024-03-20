import type {
  QueryResolvers,
  MutationResolvers,
  AccountRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'
import { nanoid } from 'src/lib/nanoid'

export const accounts: QueryResolvers['accounts'] = async ({ budgetId }) => {
  const dbAccounts = await db.account.findMany({
    where: {
      budget: {
        id: budgetId,
        userId: context.currentUser?.id,
      },
    },
  })

  const inoutflows = await db.transaction.groupBy({
    by: ['accountId'],
    where: {
      account: {
        budgetId,
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

  return dbAccounts.map((account) => {
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
}

export const account: QueryResolvers['account'] = async ({ id }) => {
  const account = await db.account.findUnique({
    where: { id },
  })

  const inoutflow = await db.transaction.aggregate({
    where: {
      accountId: id,
    },
    _sum: {
      inflow: true,
      outflow: true,
    },
  })

  return {
    ...account,
    balance:
      Number(inoutflow?._sum.inflow || 0.0) -
      Number(inoutflow?._sum.outflow || 0.0),
  }
}

export const accountCreate: MutationResolvers['accountCreate'] = async ({
  input,
}) => {
  const create = await db.account.create({
    data: {
      ...input,
      id: nanoid(),
    },
  })

  return {
    ...create,
    balance: 0.0,
  }
}

export const accountUpdate: MutationResolvers['accountUpdate'] = async ({
  input: {
    filter: { id },
    update: data,
  },
}) => {
  const updateAcc = await db.account.update({
    data,
    where: {
      id,
      budget: { userId: context.currentUser?.id },
    },
  })

  const inoutflow = await db.transaction.aggregate({
    where: {
      account: {
        id: id,
        budget: { userId: context.currentUser?.id },
      },
    },
    _sum: {
      inflow: true,
      outflow: true,
    },
  })

  return {
    ...updateAcc,
    balance:
      Number(inoutflow?._sum.inflow || 0.0) -
      Number(inoutflow?._sum.outflow || 0.0),
  }
}

export const Account: AccountRelationResolvers = {
  transactions: async (_obj, { root }) => {
    return db.account.findUnique({ where: { id: root?.id } }).transactions()
  },
}
