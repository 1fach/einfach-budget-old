import type { Prisma, BudgetCategoryGroup } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.BudgetCategoryGroupCreateArgs>({
  budgetCategoryGroup: {
    one: {
      data: {
        name: 'String',
        sortOrder: 6794362,
        budget: {
          create: {
            name: 'String',
            user: {
              create: {
                email: 'String5209523',
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
        sortOrder: 6445221,
        budget: {
          create: {
            name: 'String',
            user: {
              create: {
                email: 'String9572435',
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
