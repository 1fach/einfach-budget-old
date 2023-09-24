import type { BudgetCategory } from '@prisma/client'

import {
  budgetCategories,
  budgetCategory,
  createBudgetCategory,
  updateBudgetCategory,
  deleteBudgetCategory,
} from './budgetCategories'
import type { StandardScenario } from './budgetCategories.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('budgetCategories', () => {
  scenario(
    'returns all budgetCategories',
    async (scenario: StandardScenario) => {
      const result = await budgetCategories()

      expect(result.length).toEqual(Object.keys(scenario.budgetCategory).length)
    }
  )

  scenario(
    'returns a single budgetCategory',
    async (scenario: StandardScenario) => {
      const result = await budgetCategory({
        id: scenario.budgetCategory.one.id,
      })

      expect(result).toEqual(scenario.budgetCategory.one)
    }
  )

  scenario('creates a budgetCategory', async (scenario: StandardScenario) => {
    const result = await createBudgetCategory({
      input: {
        name: 'String',
        sortOrder: 2505839,
        groupId: scenario.budgetCategory.two.groupId,
      },
    })

    expect(result.name).toEqual('String')
    expect(result.sortOrder).toEqual(2505839)
    expect(result.groupId).toEqual(scenario.budgetCategory.two.groupId)
  })

  scenario('updates a budgetCategory', async (scenario: StandardScenario) => {
    const original = (await budgetCategory({
      id: scenario.budgetCategory.one.id,
    })) as BudgetCategory
    const result = await updateBudgetCategory({
      id: original.id,
      input: { name: 'String2' },
    })

    expect(result.name).toEqual('String2')
  })

  scenario('deletes a budgetCategory', async (scenario: StandardScenario) => {
    const original = (await deleteBudgetCategory({
      id: scenario.budgetCategory.one.id,
    })) as BudgetCategory
    const result = await budgetCategory({ id: original.id })

    expect(result).toEqual(null)
  })
})
