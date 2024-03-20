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

export const userUpdate: MutationResolvers['userUpdate'] = ({
  input: { update: data },
}) => {
  return db.user.update({
    data,
    where: { id: context.currentUser?.id },
  })
}

export const User: UserRelationResolvers = {
  budgets: (_obj, { root }) => {
    return db.user.findUnique({ where: { id: root?.id } }).budgets()
  },
}
