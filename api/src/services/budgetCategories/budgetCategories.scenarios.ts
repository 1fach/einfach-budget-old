import type { Prisma, BudgetCategory } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.BudgetCategoryCreateArgs>({
  budgetCategory: {
    one: {
      data: {
        name: 'String',
        sortOrder: 5451937,
        budgetCategoryGroup: {
          create: {
            name: 'String',
            sortOrder: 566090,
            budget: {
              create: {
                name: 'String',
                user: {
                  create: {
                    email: 'String4029508',
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
        sortOrder: 4390020,
        budgetCategoryGroup: {
          create: {
            name: 'String',
            sortOrder: 5013990,
            budget: {
              create: {
                name: 'String',
                user: {
                  create: {
                    email: 'String39836',
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
