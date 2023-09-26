import type { Prisma, BudgetCategory } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.BudgetCategoryCreateArgs>({
  budgetCategory: {
    one: {
      data: {
        name: 'String',
        sortOrder: 9684060,
        group: {
          create: {
            name: 'String',
            sortOrder: 8904097,
            budget: {
              create: {
                name: 'String',
                user: {
                  create: {
                    email: 'String8995528',
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
        sortOrder: 2303764,
        group: {
          create: {
            name: 'String',
            sortOrder: 6590853,
            budget: {
              create: {
                name: 'String',
                user: {
                  create: {
                    email: 'String7467264',
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
