import type {
  QueryResolvers,
  MutationResolvers,
  BudgetRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const budgetsByUser: QueryResolvers['budgetsByUser'] = ({ userId }) => {
  return db.budget.findMany({ where: { userId } })
}

export const budget: QueryResolvers['budget'] = ({ id }) => {
  return db.budget.findUnique({
    where: { id },
  })
}

export const budgetByMonth: QueryResolvers['budgetByMonth'] = ({
  id,
  month,
  year,
}) => {
  return db.budget.findUnique({
    include: {
      budgetCategoryGroups: {
        include: {
          budgetCategories: {
            include: {
              monthlyBudgetPerCategories: {
                where: {
                  month: month,
                  year: year,
                },
              },
            },
            orderBy: {
              sortOrder: 'asc',
            },
          },
        },
        orderBy: {
          sortOrder: 'asc',
        },
      },
    },
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
  budgetCategoryGroups: (_obj, { root }) => {
    return db.budget
      .findUnique({ where: { id: root?.id } })
      .budgetCategoryGroups()
  },
}
