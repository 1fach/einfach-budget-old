import type { Prisma, Account } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.AccountCreateArgs>({
  account: {
    one: {
      data: {
        nickname: 'String2006040',
        payee: { create: { name: 'String978566' } },
      },
    },
    two: {
      data: {
        nickname: 'String5265653',
        payee: { create: { name: 'String5440641' } },
      },
    },
  },
})

export type StandardScenario = ScenarioData<Account, 'account'>
