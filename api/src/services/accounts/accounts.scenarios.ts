import type { Prisma, Account } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.AccountCreateArgs>({
  account: {
    one: {
      data: {
        nickname: 'String',
        budget: {
          create: {
            name: 'String',
            user: {
              create: {
                email: 'String1558365',
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
        nickname: 'String',
        budget: {
          create: {
            name: 'String',
            user: {
              create: {
                email: 'String774747',
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

export type StandardScenario = ScenarioData<Account, 'account'>
