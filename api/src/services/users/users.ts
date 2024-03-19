import type {
  QueryResolvers,
  MutationResolvers,
  UserRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const user: QueryResolvers['user'] = () => {
  return db.user.findUnique({
    where: { id: context.currentUser?.id },
  })
}

export const updateUser: MutationResolvers['updateUser'] = ({ input }) => {
  return db.user.update({
    data: input,
    where: { id: context.currentUser?.id },
  })
}

export const User: UserRelationResolvers = {
  budgets: (_obj, { root }) => {
    return db.user.findUnique({ where: { id: root?.id } }).budgets()
  },
}
