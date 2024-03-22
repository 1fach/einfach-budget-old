import { sql } from 'kysely'
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
        name: true,
        sortOrder: true,
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

    if (categoriesNoBudget.length === 0) {
      return {
        categories: [],
      }
    }

    const valuesToInsert = categoriesNoBudget.map((category) => ({
      id: nanoid(),
      month,
      year,
      assigned: 0,
      budget_category_id: category.id,
    }))

    const insert = await db.$kysely
      .insertInto('monthly_budget_per_category')
      .values(valuesToInsert)
      .returning('budget_category_id')
      .execute()

    const success = categoriesNoBudget.map((category) => {
      const created = insert.find(
        (monthlyBudgetCategory) =>
          monthlyBudgetCategory.budget_category_id === category.id
      )

      if (!created) {
        return null
      }

      return {
        id: category.id + '_' + year + month,
        name: category.name,
        sortOrder: category.sortOrder,
        month,
        year,
        assigned: 0.0,
        activity: 0.0,
        available: 0.0,
      }
    })

    return {
      categories: success,
    }
  }

export const monthlyBudgetAssign: MutationResolvers['monthlyBudgetAssign'] =
  async ({
    input: {
      filter: { categoryId, month, year },
      update: data,
    },
  }) => {
    const updatedMonthlyBudgetCategory = db.monthlyBudgetPerCategory.update({
      data,
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
    const groups = await db.$kysely
      .selectFrom('monthly_budget_per_category as m')
      .leftJoin('transaction as t', 't.monthly_budget_per_category_id', 'm.id')
      .leftJoin('budget_category as bc', 'bc.id', 'm.budget_category_id')
      .leftJoin(
        'budget_category_group as bg',
        'bg.id',
        'bc.budget_category_group_id'
      )
      .where('bg.budget_id', '=', budgetId)
      .where('m.month', '=', root.month)
      .where('m.year', '=', root.year)
      .groupBy(['bg.id', 'bg.name', 'bg.sort_order'])
      .orderBy('bg.sort_order')
      .select((eb) => [
        'bg.id',
        'bg.name',
        'bg.sort_order',
        eb.fn.sum<number>('m.assigned').as('assigned'),
        eb(
          eb.fn.coalesce(eb.fn.sum<number | null>('t.inflow'), sql<number>`0`),
          '-',
          eb.fn.coalesce(eb.fn.sum<number | null>('t.outflow'), sql<number>`0`)
        ).as('activity'),
        eb(
          eb(
            eb.fn.coalesce(
              eb.fn.sum<number | null>('t.inflow'),
              sql<number>`0`
            ),
            '-',
            eb.fn.coalesce(
              eb.fn.sum<number | null>('t.outflow'),
              sql<number>`0`
            )
          ),
          '+',
          eb.fn.coalesce(eb.fn.sum<number | null>('m.assigned'), sql<number>`0`)
        ).as('available'),
      ])
      .execute()

    return groups.map((group) => {
      return {
        id: group.id + '_' + root.year + root.month,
        name: group.name,
        month: root.month,
        year: root.year,
        sortOrder: group.sort_order,
        assigned: group.assigned,
        activity: group.activity,
        available: group.available,
      }
    })
  },
}

async function calculateReadyToAssign(
  budget: { id: string; name: string; userId: string },
  month: number,
  year: number
) {
  // total income until this month
  const incomeTillThisMonth = db.$kysely
    .selectFrom('transaction as t')
    .innerJoin('account as a', 'a.id', 't.account_id')
    .innerJoin(
      'monthly_budget_per_category as m',
      'm.id',
      't.monthly_budget_per_category_id'
    )
    .where('a.budget_id', '=', budget.id)
    .where(({ eb, or, and }) =>
      or([
        eb('m.year', '<', year),
        and([eb('m.year', '=', year), eb('m.month', '<=', month)]),
      ])
    )
    .select((eb) => eb.fn.sum<number>('t.inflow').as('total_income'))
    .executeTakeFirst()

  // previous months overspending
  const prevMonthsOverspending = db.$kysely
    .with('overspending_per_monthly_budget_category', (qb) =>
      qb
        .selectFrom('transaction as t')
        .innerJoin(
          'monthly_budget_per_category as m',
          'm.id',
          't.monthly_budget_per_category_id'
        )
        .innerJoin('budget_category as bc', 'bc.id', 'm.budget_category_id')
        .innerJoin(
          'budget_category_group as bg',
          'bg.id',
          'bc.budget_category_group_id'
        )
        .where('bg.budget_id', '=', budget.id)
        .where(({ eb, or, and }) =>
          or([
            eb('m.year', '<', year),
            and([eb('m.year', '=', year), eb('m.month', '<', month)]),
          ])
        )
        .groupBy('m.id')
        .having((eb) =>
          eb(
            eb(eb.fn.sum('t.inflow'), '+', eb.fn.sum('m.assigned')),
            '<',
            eb.fn.sum('t.outflow')
          )
        )
        .select((eb) =>
          eb(
            eb(
              eb.fn.sum<number>('m.assigned'),
              '+',
              eb.fn.sum<number>('t.inflow')
            ),
            '-',
            eb.fn.sum<number>('t.outflow')
          ).as('overspent')
        )
        .$assertType<{ overspent: number }>()
    )
    .selectFrom('overspending_per_monthly_budget_category as o')
    .select((eb) =>
      eb.fn
        .coalesce(eb.fn.sum<number | null>('o.overspent'), sql<number>`0`)
        .as('total_overspending')
    )
    .executeTakeFirst()

  // total assigned until this month and future
  const totalAssigned = db.$kysely
    .selectFrom('monthly_budget_per_category as m')
    .innerJoin('budget_category as bc', 'bc.id', 'm.budget_category_id')
    .innerJoin(
      'budget_category_group as bg',
      'bg.id',
      'bc.budget_category_group_id'
    )
    .where('bg.budget_id', '=', budget.id)
    .select((eb) => [
      eb.fn
        .sum<number>(
          eb
            .case()
            .when(
              eb.or([
                eb('m.year', '<', year),
                eb.and([eb('m.year', '=', year), eb('m.month', '<=', month)]),
              ])
            )
            .then(eb.ref('m.assigned'))
            .else(0)
            .end()
        )
        .as('assigned_till_this_month'),
      eb.fn
        .sum<number>(
          eb
            .case()
            .when(
              eb.or([
                eb('m.year', '>', year),
                eb.and([eb('m.year', '=', year), eb('m.month', '>', month)]),
              ])
            )
            .then(eb.ref('m.assigned'))
            .else(0)
            .end()
        )
        .as('assigned_future'),
    ])
    .executeTakeFirst()

  const rtaWithoutFuture =
    (await incomeTillThisMonth).total_income -
    (await prevMonthsOverspending).total_overspending -
    (await totalAssigned).assigned_till_this_month

  return rtaWithoutFuture < 0
    ? rtaWithoutFuture
    : Math.max(rtaWithoutFuture - (await totalAssigned).assigned_future, 0.0)
}
