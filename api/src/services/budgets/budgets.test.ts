import type { Budget } from '@prisma/client'

import {
  budgetsByUser,
  budget,
  createBudget,
  updateBudget,
  deleteBudget,
} from './budgets'
import type { StandardScenario } from './budgets.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('budgets', () => {
  scenario(
    'returns all budgets of a user',
    async (scenario: StandardScenario) => {
      const result = await budgetsByUser({ userId: scenario.budget.two.userId })

      expect(result).toEqual(scenario.budget.two)
    }
  )

  scenario('returns a single budget', async (scenario: StandardScenario) => {
    const result = await budget({
      id: scenario.budget.one.id,
      userId: scenario.budget.one.userId,
    })

    expect(result).toEqual(scenario.budget.one)
  })

  scenario('creates a budget', async (scenario: StandardScenario) => {
    const result = await createBudget({
      input: { name: 'String', userId: scenario.budget.two.userId },
    })

    expect(result.name).toEqual('String')
    expect(result.userId).toEqual(scenario.budget.two.userId)
  })

  scenario('updates a budget', async (scenario: StandardScenario) => {
    const original = (await budget({
      id: scenario.budget.one.id,
      userId: scenario.budget.one.userId,
    })) as Budget
    const result = await updateBudget({
      id: original.id,
      input: { name: 'String2' },
    })

    expect(result.name).toEqual('String2')
  })

  scenario('deletes a budget', async (scenario: StandardScenario) => {
    const original = (await deleteBudget({
      id: scenario.budget.one.id,
    })) as Budget
    const result = await budget({ id: original.id, userId: original.userId })

    expect(result).toEqual(null)
  })
})
