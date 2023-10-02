import type {
  QueryResolvers,
  MutationResolvers,
  AccountBalanceRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const accountBalances: QueryResolvers['accountBalances'] = () => {
  return db.accountBalance.findMany()
}

export const accountBalance: QueryResolvers['accountBalance'] = ({ id }) => {
  return db.accountBalance.findUnique({
    where: { id },
  })
}

export const createAccountBalance: MutationResolvers['createAccountBalance'] =
  ({ input }) => {
    return db.accountBalance.create({
      data: input,
    })
  }

export const updateAccountBalance: MutationResolvers['updateAccountBalance'] =
  ({ id, input }) => {
    return db.accountBalance.update({
      data: input,
      where: { id },
    })
  }

export const deleteAccountBalance: MutationResolvers['deleteAccountBalance'] =
  ({ id }) => {
    return db.accountBalance.delete({
      where: { id },
    })
  }

export const AccountBalance: AccountBalanceRelationResolvers = {
  account: (_obj, { root }) => {
    return db.accountBalance.findUnique({ where: { id: root?.id } }).account()
  },
}
