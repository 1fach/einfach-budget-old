import type { Prisma, MonthlyBudget } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.MonthlyBudgetCreateArgs>({
  monthlyBudget: {
    one: {
      data: {
        month: 193636,
        year: 5630955,
        budget: {
          create: {
            name: 'String372575',
            user: {
              create: {
                email: 'String9940892',
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
        month: 6621800,
        year: 2952930,
        budget: {
          create: {
            name: 'String3519472',
            user: {
              create: {
                email: 'String7451286',
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

export type StandardScenario = ScenarioData<MonthlyBudget, 'monthlyBudget'>
