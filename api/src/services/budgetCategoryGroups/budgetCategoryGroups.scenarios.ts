import type { Prisma, BudgetCategoryGroup } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.BudgetCategoryGroupCreateArgs>({
  budgetCategoryGroup: {
    one: {
      data: {
        name: 'String',
        sortOrder: 4412800,
        budget: {
          create: {
            name: 'String',
            user: {
              create: {
                email: 'String8851043',
                hashedPassword: 'String',
                salt: 'String',
              },
            },
          },
        },
      },
    },
    two: {
      data: {
        name: 'String',
        sortOrder: 7654403,
        budget: {
          create: {
            name: 'String',
            user: {
              create: {
                email: 'String8352892',
                hashedPassword: 'String',
                salt: 'String',
              },
            },
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<
  BudgetCategoryGroup,
  'budgetCategoryGroup'
>
