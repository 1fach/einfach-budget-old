import type { Prisma, BudgetCategoryGroup } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.BudgetCategoryGroupCreateArgs>({
  budgetCategoryGroup: {
    one: {
      data: {
        name: 'String',
        sortOrder: 9887818,
        budget: {
          create: {
            name: 'String',
            user: {
              create: {
                email: 'String775621',
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
        sortOrder: 2332743,
        budget: {
          create: {
            name: 'String',
            user: {
              create: {
                email: 'String7517571',
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
