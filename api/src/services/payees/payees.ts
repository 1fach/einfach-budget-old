import type {
  QueryResolvers,
  MutationResolvers,
  PayeeRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'
import { nanoid } from 'src/lib/nanoid'

export const payees: QueryResolvers['payees'] = ({ budgetId }) => {
  return db.payee.findMany({
    where: {
      budget: {
        id: budgetId,
        userId: context.currentUser?.id,
      },
    },
  })
}

export const payee: QueryResolvers['payee'] = ({ id }) => {
  return db.payee.findUnique({
    where: {
      id,
      budget: { userId: context.currentUser?.id },
    },
  })
}

export const payeeCreate: MutationResolvers['payeeCreate'] = ({ input }) => {
  return db.payee.create({
    data: {
      ...input,
      id: nanoid(),
    },
  })
}

export const payeeUpdate: MutationResolvers['payeeUpdate'] = ({
  input: {
    filter: { id },
    update: data,
  },
}) => {
  return db.payee.update({
    data,
    where: {
      id,
      budget: { userId: context.currentUser?.id },
    },
  })
}

export const Payee: PayeeRelationResolvers = {
  transactions: (_obj, { root }) => {
    return db.payee.findUnique({ where: { id: root?.id } }).transactions()
  },
}
