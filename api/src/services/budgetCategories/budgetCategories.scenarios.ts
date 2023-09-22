import type { Prisma, BudgetCategory } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.BudgetCategoryCreateArgs>({
  budgetCategory: {
    one: { data: { name: 'String' } },
    two: { data: { name: 'String' } },
  },
})

export type StandardScenario = ScenarioData<BudgetCategory, 'budgetCategory'>
