import type { Prisma, Budget } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.BudgetCreateArgs>({
  budget: {
    one: {
      data: {
        name: 'String',
        user: {
          create: {
            email: 'String6000265',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
      },
    },
    two: {
      data: {
        name: 'String',
        user: {
          create: {
            email: 'String5408441',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<Budget, 'budget'>
