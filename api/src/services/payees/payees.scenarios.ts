import type { Prisma, Payee } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.PayeeCreateArgs>({
  payee: {
    one: {
      data: {
        name: 'String',
        budget: {
          create: {
            name: 'String',
            slug: 'String',
            user: {
              create: {
                email: 'String5513640',
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
        name: 'String',
        budget: {
          create: {
            name: 'String',
            slug: 'String',
            user: {
              create: {
                email: 'String8930084',
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

export type StandardScenario = ScenarioData<Payee, 'payee'>
