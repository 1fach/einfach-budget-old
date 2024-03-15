import type {
  QueryResolvers,
  MutationResolvers,
  AccountRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const accounts: QueryResolvers['accounts'] = async ({ budgetId }) => {
  const dbAccounts = await db.account.findMany({
    include: {
      accountBalance: {
        select: {
          workingBalance: true,
        },
      },
    },
    where: {
      budget: {
        id: budgetId,
        userId: context.currentUser?.id,
      },
    },
  })

  return dbAccounts.map((account) => {
    return {
      ...account,
      balance: account.accountBalance.workingBalance.toNumber(),
    }
  })
}

export const account: QueryResolvers['account'] = async ({ id }) => {
  const account = await db.account.findUnique({
    include: {
      accountBalance: {
        select: {
          workingBalance: true,
        },
      },
    },
    where: { id },
  })

  return {
    ...account,
    balance: account.accountBalance.workingBalance.toNumber(),
  }
}

export const createAccount: MutationResolvers['createAccount'] = ({
  input,
}) => {
  return db.account.create({
    data: input,
  })
}

export const updateAccount: MutationResolvers['updateAccount'] = ({
  id,
  input,
}) => {
  return db.account.update({
    data: input,
    where: { id },
  })
}

export const deleteAccount: MutationResolvers['deleteAccount'] = ({ id }) => {
  return db.account.delete({
    where: { id },
  })
}

export const Account: AccountRelationResolvers = {
  budget: (_obj, { root }) => {
    return root.budget
  },
  transactions: async (_obj, { root }) => {
    return db.account.findUnique({ where: { id: root?.id } }).transactions()
  },
  payee: (_obj, { root }) => {
    return root.payee
  },
}
