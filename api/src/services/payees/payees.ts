import type {
  QueryResolvers,
  MutationResolvers,
  PayeeRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const payees: QueryResolvers['payees'] = () => {
  return db.payee.findMany()
}

export const payee: QueryResolvers['payee'] = ({ id }) => {
  return db.payee.findUnique({
    where: { id },
  })
}

export const createPayee: MutationResolvers['createPayee'] = ({ input }) => {
  return db.payee.create({
    data: input,
  })
}

export const updatePayee: MutationResolvers['updatePayee'] = ({
  id,
  input,
}) => {
  return db.payee.update({
    data: input,
    where: { id },
  })
}

export const deletePayee: MutationResolvers['deletePayee'] = ({ id }) => {
  return db.payee.delete({
    where: { id },
  })
}

export const Payee: PayeeRelationResolvers = {
  budget: (_obj, { root }) => {
    return root.budget
  },
  account: (_obj, { root }) => {
    return root.account
  },
  transactions: (_obj, { root }) => {
    return db.payee.findUnique({ where: { id: root?.id } }).transactions()
  },
}
