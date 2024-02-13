import type {
  MonthlyBudgetGroupRelationResolvers,
  QueryResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const monthlyBudget: QueryResolvers['monthlyBudget'] = async ({
  id,
  userId,
  month,
  year,
}) => {
  const query = await db.budget.findUnique({
    where: {
      id,
      userId,
    },
    include: {
      budgetCategoryGroups: {
        orderBy: {
          sortOrder: 'asc',
        },
        include: {
          monthlyCategoryGroupActivities: {
            where: {
              month,
              year,
            },
          },
          budgetCategories: {
            orderBy: {
              sortOrder: 'asc',
            },
            include: {
              monthlyBudgetPerCategories: {
                where: {
                  month,
                  year,
                },
                include: {
                  monthlyCategoryActivity: true,
                },
              },
            },
          },
        },
      },
    },
  })

  const res = query.budgetCategoryGroups.map((group) => {
    return {
      id: group.id,
      name: group.name,
      month,
      year,
      assigned:
        group.monthlyCategoryGroupActivities[0]?.assigned.toNumber() || 0,
      activity:
        group.monthlyCategoryGroupActivities[0]?.activity.toNumber() || 0,
      available:
        group.monthlyCategoryGroupActivities[0]?.available.toNumber() || 0,
    }
  })

  return res
}

export const MonthlyBudgetGroup: MonthlyBudgetGroupRelationResolvers = {
  subRows: async (_obj, { root }) => {
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
