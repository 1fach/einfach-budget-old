import type { Prisma, Account } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.AccountCreateArgs>({
  account: {
    one: {
      data: {
        nickname: 'String',
        payee: { create: { name: 'String' } },
        budget: {
          create: {
            name: 'String',
            user: {
              create: {
                email: 'String2783308',
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
        payee: { create: { name: 'String' } },
        budget: {
          create: {
            name: 'String',
            user: {
              create: {
                email: 'String399376',
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
