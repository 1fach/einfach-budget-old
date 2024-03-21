import type { MonthlyBudgetGroupRelationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'

export const MonthlyBudgetGroup: MonthlyBudgetGroupRelationResolvers = {
  categories: async (_obj, { root }) => {
    const groupId = root.id.split('_')[0]

    const categories = await db.$kysely
      .selectFrom('transaction as t')
      .innerJoin(
        'monthly_budget_per_category as m',
        'm.id',
        't.monthly_budget_per_category_id'
      )
      .innerJoin('budget_category as bc', 'bc.id', 'm.budget_category_id')
      .where('bc.budget_category_group_id', '=', groupId)
      .where('m.month', '=', root.month)
      .where('m.year', '=', root.year)
      .groupBy(['bc.id', 'bc.name', 'bc.sort_order'])
      .orderBy('bc.sort_order')
      .select((eb) => [
        'bc.id',
        'bc.name',
        'bc.sort_order',
        eb.fn.sum<number>('m.assigned').as('assigned'),
        eb(
          eb.fn.sum<number>('t.inflow'),
          '-',
          eb.fn.sum<number>('t.outflow')
        ).as('activity'),
        eb(
          eb(
            eb.fn.sum<number>('t.inflow'),
            '-',
            eb.fn.sum<number>('t.outflow')
          ),
          '+',
          eb.fn.sum<number>('m.assigned')
        ).as('available'),
      ])
      .execute()

    return categories.map((category) => {
      return {
        id: category.id + '_' + root.year + root.month,
        name: category.name,
        month: root.month,
        year: root.year,
        sortOrder: category.sort_order,
        assigned: category.assigned,
        activity: category.activity,
        available: category.available,
      }
    })
  },
}
