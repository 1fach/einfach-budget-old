import type {
  QueryResolvers,
  AccountBalanceRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const accountBalances: QueryResolvers['accountBalances'] = () => {
  return db.accountBalance.findMany()
}

export const AccountBalance: AccountBalanceRelationResolvers = {
  account: (_obj, { root }) => {
    return db.accountBalance
      .findUnique({ where: { accountId: root?.accountId } })
      .account()
  },
}
