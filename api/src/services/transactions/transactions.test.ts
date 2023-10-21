import type { Transaction } from '@prisma/client'

import {
  transactions,
  transaction,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} from './transactions'
import type { StandardScenario } from './transactions.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('transactions', () => {
  scenario('returns all transactions', async (scenario: StandardScenario) => {
    const result = await transactions()

    expect(result.length).toEqual(Object.keys(scenario.transaction).length)
  })

  scenario(
    'returns a single transaction',
    async (scenario: StandardScenario) => {
      const result = await transaction({ id: scenario.transaction.one.id })

      expect(result).toEqual(scenario.transaction.one)
    }
  )

  scenario('creates a transaction', async (scenario: StandardScenario) => {
    const result = await createTransaction({
      input: {
        description: 'String',
        accountId: scenario.transaction.two.accountId,
        cleared: scenario.transaction.two.cleared,
        date: scenario.transaction.two.date,
        inflow: scenario.transaction.two.inflow.toNumber(),
        outflow: scenario.transaction.two.outflow.toNumber(),
        monthlyBudgetPerCategoryId:
          scenario.transaction.two.monthlyBudgetPerCategoryId,
      },
    })

    expect(result.description).toEqual('String')
    expect(result.accountId).toEqual(scenario.transaction.two.accountId)
    expect(result.cleared).toEqual(scenario.transaction.two.cleared)
    expect(result.date).toEqual(scenario.transaction.two.date)
    expect(result.inflow).toEqual(scenario.transaction.two.inflow)
    expect(result.outflow).toEqual(scenario.transaction.two.outflow)
    expect(result.monthlyBudgetPerCategoryId).toEqual(
      scenario.transaction.two.monthlyBudgetPerCategoryId
    )
  })

  scenario('updates a transaction', async (scenario: StandardScenario) => {
    const original = (await transaction({
      id: scenario.transaction.one.id,
    })) as Transaction
    const result = await updateTransaction({
      id: original.id,
      input: { description: 'String2' },
    })

    expect(result.description).toEqual('String2')
  })

  scenario('deletes a transaction', async (scenario: StandardScenario) => {
    const original = (await deleteTransaction({
      id: scenario.transaction.one.id,
    })) as Transaction
    const result = await transaction({ id: original.id })

    expect(result).toEqual(null)
  })
})
