import type {
  MonthlyBudgetRelationResolvers,
  QueryResolvers,
  MutationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'
import { nanoid } from 'src/lib/nanoid'

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
  })

  if (!budget) {
    return null
  }

  // income this month
  const rta = await calculateReadyToAssign(budget, month, year)

  return {
    id: budget.id + '_' + year + month,
    name: budget.name,
    userId: budget.userId,
    readyToAssign: rta,
    month,
    year,
  }
}

export const monthlyBudgetInit: MutationResolvers['monthlyBudgetInit'] =
  async ({ input }) => {
    const { budgetId, month, year } = input

    const categoriesNoBudget = await db.budgetCategory.findMany({
      select: {
        id: true,
      },
      where: {
        budgetCategoryGroup: {
          budgetId,
        },
        NOT: {
          monthlyBudgetPerCategories: {
            some: {
              month,
              year,
            },
          },
        },
      },
    })

    const categoryIds = categoriesNoBudget.map((category) => category.id)

    await db.monthlyBudgetPerCategory.createMany({
      data: categoryIds.map((budgetCategoryId) => ({
        id: nanoid(),
        budgetCategoryId,
        month,
        year,
        assigned: 0,
      })),
    })

    const monthlyBudgetCategories = await db.monthlyBudgetPerCategory.findMany({
      select: {
        month: true,
        year: true,
        assigned: true,
        budgetCategory: {
          select: {
            id: true,
            name: true,
            sortOrder: true,
          },
        },
      },
      where: {
        month,
        year,
        budgetCategory: {
          id: {
            in: categoryIds,
          },
          budgetCategoryGroup: {
            budget: {
              userId: context.currentUser?.id,
            },
          },
        },
      },
    })

    return {
      categories: monthlyBudgetCategories.map((monthlyBudgetCategory) => {
        const budgetCategory = monthlyBudgetCategory.budgetCategory
        return {
          id: budgetCategory.id + '_' + year + month,
          name: budgetCategory.name,
          sortOrder: budgetCategory.sortOrder,
          month: monthlyBudgetCategory.month,
          year: monthlyBudgetCategory.year,
          assigned: 0.0,
          activity: 0.0,
          available: 0.0,
        }
      }),
    }
  }

export const monthlyBudgetAssign: MutationResolvers['monthlyBudgetAssign'] =
  async ({ input }) => {
    const { assigned, month, year, categoryId } = input

    const updatedMonthlyBudgetCategory = db.monthlyBudgetPerCategory.update({
      data: { assigned },
      where: {
        month_year_budgetCategoryId: {
          month,
          year,
          budgetCategoryId: categoryId,
        },
        budgetCategory: {
          budgetCategoryGroup: {
            budget: {
              userId: context.currentUser?.id,
            },
          },
        },
      },
    })

    const budgetCategory = await updatedMonthlyBudgetCategory.budgetCategory()
    const monthlyBudgetCategory = await updatedMonthlyBudgetCategory

    const activity = await db.transaction.aggregate({
      _sum: {
        outflow: true,
        inflow: true,
      },
      where: {
        monthlyBudgetPerCategory: {
          budgetCategory: {
            id: categoryId,
          },
          month: month,
          year: year,
        },
      },
    })

    const resAssigned = Number(monthlyBudgetCategory.assigned || 0.0)
    const resActivity =
      Number(activity?._sum.inflow || 0.0) -
      Number(activity?._sum.outflow || 0.0)

    return {
      category: {
        id: budgetCategory.id + '_' + year + month,
        name: budgetCategory.name,
        sortOrder: budgetCategory.sortOrder,
        month: monthlyBudgetCategory.month,
        year: monthlyBudgetCategory.year,
        assigned: resAssigned,
        activity: resActivity,
        available: resAssigned - resActivity,
      },
    }
  }

export const MonthlyBudget: MonthlyBudgetRelationResolvers = {
  groups: async (_obj, { root }) => {
    const budgetId = root.id.split('_')[0]
    const budget = await db.budget.findUnique({
      where: {
        id: budgetId,
        userId: context.currentUser?.id,
      },
      include: {
        budgetCategoryGroups: {
          orderBy: {
            sortOrder: 'asc',
          },
        },
      },
    })

    return budget.budgetCategoryGroups.map(async (group) => {
      const assigned = await db.monthlyBudgetPerCategory.aggregate({
        where: {
          budgetCategory: {
            budgetCategoryGroupId: group.id,
          },
          month: root.month,
          year: root.year,
        },
        _sum: {
          assigned: true,
        },
      })

      const activity = await db.transaction.aggregate({
        where: {
          monthlyBudgetPerCategory: {
            budgetCategory: {
              budgetCategoryGroupId: group.id,
            },
            month: root.month,
            year: root.year,
          },
        },
        _sum: {
          outflow: true,
          inflow: true,
        },
      })

      const totalActivity =
        Number(activity?._sum.inflow || 0.0) -
        Number(activity?._sum.outflow || 0.0)

      return {
        id: group.id + '_' + root.year + root.month,
        name: group.name,
        month: root.month,
        year: root.year,
        sortOrder: group.sortOrder,
        assigned: Number(assigned._sum.assigned || 0.0),
        activity: totalActivity,
        available: Number(assigned._sum.assigned || 0.0) + totalActivity,
      }
    })
  },
}

async function calculateReadyToAssign(
  budget: { id: string; name: string; userId: string },
  month: number,
  year: number
) {
  const incomeTillThisMonth = await db.transaction.aggregate({
    where: {
      monthlyBudgetPerCategory: {
        budgetCategory: {
          budgetCategoryGroup: {
            budgetId: budget.id,
          },
        },
        OR: [
          {
            month: {
              lte: month,
            },
            year,
          },
          {
            year: {
              lt: year,
            },
          },
        ],
      },
    },
    _sum: {
      inflow: true,
    },
  })

  // prev months overspending
  const prevMonthsOutflows = await db.transaction.groupBy({
    by: ['monthlyBudgetPerCategoryId'],
    where: {
      outflow: {
        gt: 0,
      },
      monthlyBudgetPerCategory: {
        budgetCategory: {
          budgetCategoryGroup: {
            budgetId: budget.id,
          },
        },
        OR: [
          {
            month: {
              lt: month,
            },
            year,
          },
          {
            year: {
              lt: year,
            },
          },
        ],
      },
    },
    _sum: {
      outflow: true,
    },
  })

  const assignedMoney = await db.monthlyBudgetPerCategory.findMany({
    select: {
      id: true,
      month: true,
      year: true,
      assigned: true,
    },
    where: {
      budgetCategory: {
        budgetCategoryGroup: {
          budgetId: budget.id,
        },
      },
    },
  })

  const prevMonthsAssigned = assignedMoney.filter(
    (a) => (a.month < month && a.year === year) || a.year < year
  )

  const prevMonthsOverspending = prevMonthsAssigned.reduce((acc, cur) => {
    const outflow = Number(
      prevMonthsOutflows.find((o) => o.monthlyBudgetPerCategoryId === cur.id)
        ._sum.outflow || 0
    )

    if (outflow <= Number(cur.assigned)) {
      return acc
    } else {
      return acc + (Number(cur.assigned) - outflow)
    }
  }, 0)

  // assigned till this month
  const assignedTillThisMonth = assignedMoney.reduce((acc, cur) => {
    if ((cur.month <= month && cur.year === year) || cur.year < year) {
      return acc + Number(cur.assigned || 0.0)
    } else {
      return acc
    }
  }, 0)

  // future assigned
  const futureAssigned = assignedMoney.reduce((acc, cur) => {
    if ((cur.month > month && cur.year === year) || cur.year > year) {
      return acc + Number(cur.assigned || 0.0)
    } else {
      return acc
    }
  }, 0)

  const rtaWithoutFuture =
    Number(incomeTillThisMonth._sum.inflow || 0.0) -
    prevMonthsOverspending -
    assignedTillThisMonth

  const rta =
    rtaWithoutFuture < 0
      ? rtaWithoutFuture
      : Math.max(rtaWithoutFuture - futureAssigned, 0.0)
  return rta
}
