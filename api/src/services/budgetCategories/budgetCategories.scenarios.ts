import type { Prisma, BudgetCategory } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.BudgetCategoryCreateArgs>({
  budgetCategory: {
    one: {
      data: {
        name: 'String',
        sortOrder: 9932988,
        group: {
          create: {
            name: 'String',
            sortOrder: 726087,
            budget: {
              create: {
                name: 'String',
                user: {
                  create: {
                    email: 'String6708199',
                    hashedPassword: 'String',
                    salt: 'String',
                  },
                },
              },
            },
          },
        },
      },
    },
    two: {
      data: {
        name: 'String',
        sortOrder: 4477204,
        group: {
          create: {
            name: 'String',
            sortOrder: 7433194,
            budget: {
              create: {
                name: 'String',
                user: {
                  create: {
                    email: 'String9821217',
                    hashedPassword: 'String',
                    salt: 'String',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<BudgetCategory, 'budgetCategory'>
