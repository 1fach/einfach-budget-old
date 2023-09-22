import type { Prisma, MonthlyBudgetCategory } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.MonthlyBudgetCategoryCreateArgs>({
  monthlyBudgetCategory: {
    one: {
      data: {
        monthlyBudget: {
          create: {
            month: 5194695,
            year: 3359619,
            budget: {
              create: {
                name: 'String1325697',
                user: {
                  create: {
                    email: 'String6646427',
                    hashedPassword: 'String',
                    salt: 'String',
                  },
                },
              },
            },
          },
        },
        budgetCategory: { create: { name: 'String' } },
      },
    },
    two: {
      data: {
        monthlyBudget: {
          create: {
            month: 582301,
            year: 6052462,
            budget: {
              create: {
                name: 'String2071303',
                user: {
                  create: {
                    email: 'String2405133',
                    hashedPassword: 'String',
                    salt: 'String',
                  },
                },
              },
            },
          },
        },
        budgetCategory: { create: { name: 'String' } },
      },
    },
  },
})

export type StandardScenario = ScenarioData<
  MonthlyBudgetCategory,
  'monthlyBudgetCategory'
>
