import type {
  QueryResolvers,
  MutationResolvers,
  MonthlyBudgetRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const monthlyBudgets: QueryResolvers['monthlyBudgets'] = () => {
  return db.monthlyBudget.findMany()
}

export const monthlyBudget: QueryResolvers['monthlyBudget'] = ({ id }) => {
  return db.monthlyBudget.findUnique({
    where: { id },
  })
}

export const createMonthlyBudget: MutationResolvers['createMonthlyBudget'] = ({
  input,
}) => {
  return db.monthlyBudget.create({
    data: input,
  })
}

export const updateMonthlyBudget: MutationResolvers['updateMonthlyBudget'] = ({
  id,
  input,
}) => {
  return db.monthlyBudget.update({
    data: input,
    where: { id },
  })
}

export const deleteMonthlyBudget: MutationResolvers['deleteMonthlyBudget'] = ({
  id,
}) => {
  return db.monthlyBudget.delete({
    where: { id },
  })
}

export const MonthlyBudget: MonthlyBudgetRelationResolvers = {
  budget: (_obj, { root }) => {
    return db.monthlyBudget.findUnique({ where: { id: root?.id } }).budget()
  },
  budgetCategories: (_obj, { root }) => {
    return db.monthlyBudget
      .findUnique({ where: { id: root?.id } })
      .budgetCategories()
  },
}
