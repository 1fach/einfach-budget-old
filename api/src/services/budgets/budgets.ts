import type {
  QueryResolvers,
  MutationResolvers,
  BudgetRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const budgets: QueryResolvers['budgets'] = () => {
  return db.budget.findMany()
}

export const budget: QueryResolvers['budget'] = ({ id }) => {
  return db.budget.findUnique({
    where: { id },
  })
}

export const createBudget: MutationResolvers['createBudget'] = ({ input }) => {
  return db.budget.create({
    data: input,
  })
}

export const updateBudget: MutationResolvers['updateBudget'] = ({
  id,
  input,
}) => {
  return db.budget.update({
    data: input,
    where: { id },
  })
}

export const deleteBudget: MutationResolvers['deleteBudget'] = ({ id }) => {
  return db.budget.delete({
    where: { id },
  })
}

export const Budget: BudgetRelationResolvers = {
  user: (_obj, { root }) => {
    return db.budget.findUnique({ where: { id: root?.id } }).user()
  },
  accounts: (_obj, { root }) => {
    return db.budget.findUnique({ where: { id: root?.id } }).accounts()
  },
  categoryGroups: (_obj, { root }) => {
    return db.budget.findUnique({ where: { id: root?.id } }).categoryGroups()
  },
}
