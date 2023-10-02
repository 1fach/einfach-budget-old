import type { AccountBalance } from '@prisma/client'

import {
  accountBalances,
  accountBalance,
  createAccountBalance,
  updateAccountBalance,
  deleteAccountBalance,
} from './accountBalances'
import type { StandardScenario } from './accountBalances.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('accountBalances', () => {
  scenario(
    'returns all accountBalances',
    async (scenario: StandardScenario) => {
      const result = await accountBalances()

      expect(result.length).toEqual(Object.keys(scenario.accountBalance).length)
    }
  )

  scenario(
    'returns a single accountBalance',
    async (scenario: StandardScenario) => {
      const result = await accountBalance({
        id: scenario.accountBalance.one.id,
      })

      expect(result).toEqual(scenario.accountBalance.one)
    }
  )

  scenario('creates a accountBalance', async (scenario: StandardScenario) => {
    const result = await createAccountBalance({
      input: { accountId: scenario.accountBalance.two.accountId },
    })

    expect(result.accountId).toEqual(scenario.accountBalance.two.accountId)
  })

  scenario('updates a accountBalance', async (scenario: StandardScenario) => {
    const original = (await accountBalance({
      id: scenario.accountBalance.one.id,
    })) as AccountBalance
    const result = await updateAccountBalance({
      id: original.id,
      input: { accountId: scenario.accountBalance.two.accountId },
    })

    expect(result.accountId).toEqual(scenario.accountBalance.two.accountId)
  })

  scenario('deletes a accountBalance', async (scenario: StandardScenario) => {
    const original = (await deleteAccountBalance({
      id: scenario.accountBalance.one.id,
    })) as AccountBalance
    const result = await accountBalance({ id: original.id })

    expect(result).toEqual(null)
  })
})
