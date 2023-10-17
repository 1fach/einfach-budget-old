import type { Payee } from '@prisma/client'

import { payees, payee, createPayee, updatePayee, deletePayee } from './payees'
import type { StandardScenario } from './payees.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('payees', () => {
  scenario('returns all payees', async (scenario: StandardScenario) => {
    const result = await payees()

    expect(result.length).toEqual(Object.keys(scenario.payee).length)
  })

  scenario('returns a single payee', async (scenario: StandardScenario) => {
    const result = await payee({ id: scenario.payee.one.id })

    expect(result).toEqual(scenario.payee.one)
  })

  scenario('creates a payee', async (scenario: StandardScenario) => {
    const result = await createPayee({
      input: { name: 'String', budgetId: scenario.payee.two.budgetId },
    })

    expect(result.name).toEqual('String')
    expect(result.budgetId).toEqual(scenario.payee.two.budgetId)
  })

  scenario('updates a payee', async (scenario: StandardScenario) => {
    const original = (await payee({ id: scenario.payee.one.id })) as Payee
    const result = await updatePayee({
      id: original.id,
      input: { name: 'String2' },
    })

    expect(result.name).toEqual('String2')
  })

  scenario('deletes a payee', async (scenario: StandardScenario) => {
    const original = (await deletePayee({ id: scenario.payee.one.id })) as Payee
    const result = await payee({ id: original.id })

    expect(result).toEqual(null)
  })
})
