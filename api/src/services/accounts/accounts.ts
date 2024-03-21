import type {
  QueryResolvers,
  MutationResolvers,
  AccountRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'
import { nanoid } from 'src/lib/nanoid'

export const accounts: QueryResolvers['accounts'] = ({ budgetId }) => {
  return db.$kysely
    .selectFrom('transaction as t')
    .innerJoin('account as a', 'a.id', 't.account_id')
    .innerJoin('budget as b', 'b.id', 'a.budget_id')
    .where('b.user_id', '=', context.currentUser?.id)
    .where('a.budget_id', '=', budgetId)
    .groupBy(['a.id', 'a.nickname', 'a.budget_id', 'a.payee_id'])
    .select((eb) => [
      'a.id',
      'a.nickname',
      'a.budget_id as budgetId',
      'a.payee_id as payeeId',
      eb(eb.fn.sum<number>('t.inflow'), '-', eb.fn.sum<number>('t.outflow')).as(
        'balance'
      ),
    ])
    .execute()
}

export const account: QueryResolvers['account'] = ({ id }) => {
  return db.$kysely
    .selectFrom('transaction as t')
    .innerJoin('account as a', 'a.id', 't.account_id')
    .innerJoin('budget as b', 'b.id', 'a.budget_id')
    .where('b.user_id', '=', context.currentUser?.id)
    .where('a.id', '=', id)
    .groupBy(['a.id', 'a.nickname', 'a.budget_id', 'a.payee_id'])
    .select((eb) => [
      'a.id',
      'a.nickname',
      'a.budget_id as budgetId',
      'a.payee_id as payeeId',
      eb(eb.fn.sum<number>('t.inflow'), '-', eb.fn.sum<number>('t.outflow')).as(
        'balance'
      ),
    ])
    .executeTakeFirst()
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
