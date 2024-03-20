import type {
  QueryResolvers,
  MutationResolvers,
  BudgetRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'
import { nanoid } from 'src/lib/nanoid'

export const budgets: QueryResolvers['budgets'] = () => {
  return db.budget.findMany({ where: { userId: context.currentUser?.id } })
}

export const budget: QueryResolvers['budget'] = ({ id }) => {
  return db.budget.findUnique({
    where: { id, userId: context.currentUser?.id },
  })
}

export const budgetCreate: MutationResolvers['budgetCreate'] = ({ input }) => {
  return db.budget.create({
    data: {
      ...input,
      id: nanoid(),
      userId: context.currentUser?.id,
    },
  })
}

export const budgetRename: MutationResolvers['budgetRename'] = ({ input }) => {
  return db.budget.update({
    data: { name: input.name },
    where: { id: input.id, userId: context.currentUser?.id },
  })
}

export const Budget: BudgetRelationResolvers = {
  accounts: (_obj, { root }) => {
    return db.budget.findUnique({ where: { id: root?.id } }).accounts()
  },
  payees: (_obj, { root }) => {
    return db.budget.findUnique({ where: { id: root?.id } }).payees()
  },
}
