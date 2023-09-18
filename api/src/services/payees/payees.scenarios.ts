import type { Prisma, Payee } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.PayeeCreateArgs>({
  payee: {
    one: { data: { name: 'String9217268' } },
    two: { data: { name: 'String7403231' } },
  },
})

export type StandardScenario = ScenarioData<Payee, 'payee'>
