import type { Prisma, Budget } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.BudgetCreateArgs>({
  budget: {
    one: {
      data: {
        name: 'String8708706',
        user: {
          create: {
            email: 'String1226708',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
      },
    },
    two: {
      data: {
        name: 'String4903986',
        user: {
          create: {
            email: 'String4126889',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<Budget, 'budget'>
