import type { MonthlyBudget } from '@prisma/client'

import {
  monthlyBudgets,
  monthlyBudget,
  createMonthlyBudget,
  updateMonthlyBudget,
  deleteMonthlyBudget,
} from './monthlyBudgets'
import type { StandardScenario } from './monthlyBudgets.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('monthlyBudgets', () => {
  scenario('returns all monthlyBudgets', async (scenario: StandardScenario) => {
    const result = await monthlyBudgets()

    expect(result.length).toEqual(Object.keys(scenario.monthlyBudget).length)
  })

  scenario(
    'returns a single monthlyBudget',
    async (scenario: StandardScenario) => {
      const result = await monthlyBudget({ id: scenario.monthlyBudget.one.id })

      expect(result).toEqual(scenario.monthlyBudget.one)
    }
  )

  scenario('creates a monthlyBudget', async (scenario: StandardScenario) => {
    const result = await createMonthlyBudget({
      input: {
        month: 7149771,
        year: 8864477,
        budgetId: scenario.monthlyBudget.two.budgetId,
      },
    })

    expect(result.month).toEqual(7149771)
    expect(result.year).toEqual(8864477)
    expect(result.budgetId).toEqual(scenario.monthlyBudget.two.budgetId)
  })

  scenario('updates a monthlyBudget', async (scenario: StandardScenario) => {
    const original = (await monthlyBudget({
      id: scenario.monthlyBudget.one.id,
    })) as MonthlyBudget
    const result = await updateMonthlyBudget({
      id: original.id,
      input: { month: 9546930 },
    })

    expect(result.month).toEqual(9546930)
  })

  scenario('deletes a monthlyBudget', async (scenario: StandardScenario) => {
    const original = (await deleteMonthlyBudget({
      id: scenario.monthlyBudget.one.id,
    })) as MonthlyBudget
    const result = await monthlyBudget({ id: original.id })

    expect(result).toEqual(null)
  })
})
