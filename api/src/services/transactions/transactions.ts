import type { QueryResolvers, MutationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'
import { nanoid } from 'src/lib/nanoid'

export const transactions: QueryResolvers['transactions'] = ({ accountId }) => {
  return db.transaction.findMany({
    where: {
      accountId,
    },
  })
}

export const transaction: QueryResolvers['transaction'] = ({ id }) => {
  return db.transaction.findUnique({
    where: { id },
  })
}

export const transactionCreate: MutationResolvers['transactionCreate'] = ({
  input,
}) => {
  return db.transaction.create({
    data: {
      ...input,
      id: nanoid(),
    },
  })
}

export const transactionUpdate: MutationResolvers['transactionUpdate'] = ({
  input: {
    filter: { id },
    update: data,
  },
}) => {
  return db.transaction.update({
    data,
    where: { id },
  })
}
