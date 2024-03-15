import type {
  MonthlyBudgetGroupRelationResolvers,
  MonthlyBudgetRelationResolvers,
  QueryResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const monthlyBudget: QueryResolvers['monthlyBudget'] = async ({
  id,
  month,
  year,
}) => {
  const budget = await db.budget.findUnique({
    where: {
      id,
      userId: context.currentUser?.id,
    },
    include: {
      budgetSummaries: {
        where: {
          month,
          year,
        },
      },
    },
  })

  if (!budget) {
    return null
  }

  return {
    id: budget.id,
    name: budget.name,
    userId: budget.userId,
    readyToAssign: budget.budgetSummaries[0]?.readyToAssign.toNumber() || 0,
    month,
    year,
  }
}

export const MonthlyBudget: MonthlyBudgetRelationResolvers = {
  groups: async (_obj, { root }) => {
    const budget = await db.budget.findUnique({
      where: {
        id: root.id,
        userId: root.userId,
      },
      include: {
        budgetCategoryGroups: {
          orderBy: {
            sortOrder: 'asc',
          },
          include: {
            monthlyCategoryGroupActivities: {
              where: {
                month: root.month,
                year: root.year,
              },
            },
          },
        },
      },
    })

    return budget.budgetCategoryGroups.map((group) => {
      return {
        id: group.id,
        name: group.name,
        month: root.month,
        year: root.year,
        assigned:
          group.monthlyCategoryGroupActivities[0]?.assigned.toNumber() || 0,
        activity:
          group.monthlyCategoryGroupActivities[0]?.activity.toNumber() || 0,
        available:
          group.monthlyCategoryGroupActivities[0]?.available.toNumber() || 0,
      }
    })
  },
}

export const MonthlyBudgetGroup: MonthlyBudgetGroupRelationResolvers = {
  categories: async (_obj, { root }) => {
    const categoryGroups = await db.budgetCategoryGroup.findUnique({
      where: { id: root.id },
      include: {
        budgetCategories: {
          orderBy: {
            sortOrder: 'asc',
          },
          include: {
            monthlyBudgetPerCategories: {
              where: {
                month: root.month,
                year: root.year,
              },
              include: {
                monthlyCategoryActivity: true,
              },
            },
          },
        },
      },
    })

    return categoryGroups.budgetCategories.map((category) => {
      return {
        id: category.id,
        name: category.name,
        month: root.month,
        year: root.year,
        assigned:
          category.monthlyBudgetPerCategories[0]?.assigned.toNumber() || 0,
        activity:
          category.monthlyBudgetPerCategories[0]?.monthlyCategoryActivity.activity.toNumber() ||
          0,
        available:
          category.monthlyBudgetPerCategories[0]?.monthlyCategoryActivity.available.toNumber() ||
          0,
      }
    })
  },
}
