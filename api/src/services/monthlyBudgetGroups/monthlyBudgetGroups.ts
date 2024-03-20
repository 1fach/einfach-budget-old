import type { MonthlyBudgetGroupRelationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'

export const MonthlyBudgetGroup: MonthlyBudgetGroupRelationResolvers = {
  categories: async (_obj, { root }) => {
    const groupId = root.id.split('_')[0]

    const monthlyBudgetPerCategories =
      await db.monthlyBudgetPerCategory.findMany({
        select: {
          id: true,
          budgetCategoryId: true,
        },
        where: {
          budgetCategory: {
            budgetCategoryGroup: {
              id: groupId,
            },
          },
          month: root.month,
          year: root.year,
        },
      })

    const activities = await db.transaction.groupBy({
      by: ['monthlyBudgetPerCategoryId'],
      _sum: {
        outflow: true,
        inflow: true,
      },
      where: {
        monthlyBudgetPerCategory: {
          budgetCategory: {
            budgetCategoryGroup: {
              id: groupId,
            },
          },
          month: root.month,
          year: root.year,
        },
      },
    })

    const activitiesByCategory = {}
    activities.forEach((activity) => {
      const categoryId = monthlyBudgetPerCategories.find(
        (monthlyBudgetPerCategory) =>
          monthlyBudgetPerCategory.id === activity.monthlyBudgetPerCategoryId
      ).budgetCategoryId
      activitiesByCategory[`${categoryId}_${root.month}${root.year}`] =
        Number(activity?._sum.inflow || 0.0) -
        Number(activity?._sum.outflow || 0.0)
    })

    const categoryGroups = await db.budgetCategoryGroup.findUnique({
      where: { id: groupId },
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
            },
          },
        },
      },
    })

    return categoryGroups.budgetCategories.map(async (category) => {
      const activity = Number(
        activitiesByCategory[`${category.id}_${root.month}${root.year}`] || 0.0
      )

      return {
        id: category.id + '_' + root.year + root.month,
        name: category.name,
        month: root.month,
        year: root.year,
        sortOrder: category.sortOrder,
        assigned: Number(
          category.monthlyBudgetPerCategories[0]?.assigned || 0.0
        ),
        activity: activity,
        available:
          Number(category.monthlyBudgetPerCategories[0]?.assigned || 0.0) +
          activity,
      }
    })
  },
}
