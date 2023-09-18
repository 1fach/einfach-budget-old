import type { MonthlyBudgetCategory } from '@prisma/client'

import {
  monthlyBudgetCategories,
  monthlyBudgetCategory,
  createMonthlyBudgetCategory,
  updateMonthlyBudgetCategory,
  deleteMonthlyBudgetCategory,
} from './monthlyBudgetCategories'
import type { StandardScenario } from './monthlyBudgetCategories.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('monthlyBudgetCategories', () => {
  scenario(
    'returns all monthlyBudgetCategories',
    async (scenario: StandardScenario) => {
      const result = await monthlyBudgetCategories()

      expect(result.length).toEqual(
        Object.keys(scenario.monthlyBudgetCategory).length
      )
    }
  )

  scenario(
    'returns a single monthlyBudgetCategory',
    async (scenario: StandardScenario) => {
      const result = await monthlyBudgetCategory({
        id: scenario.monthlyBudgetCategory.one.id,
      })

      expect(result).toEqual(scenario.monthlyBudgetCategory.one)
    }
  )

  scenario(
    'creates a monthlyBudgetCategory',
    async (scenario: StandardScenario) => {
      const result = await createMonthlyBudgetCategory({
        input: {
          monthlyBudgetId: scenario.monthlyBudgetCategory.two.monthlyBudgetId,
          budgetCategoryId: scenario.monthlyBudgetCategory.two.budgetCategoryId,
        },
      })

      expect(result.monthlyBudgetId).toEqual(
        scenario.monthlyBudgetCategory.two.monthlyBudgetId
      )
      expect(result.budgetCategoryId).toEqual(
        scenario.monthlyBudgetCategory.two.budgetCategoryId
      )
    }
  )

  scenario(
    'updates a monthlyBudgetCategory',
    async (scenario: StandardScenario) => {
      const original = (await monthlyBudgetCategory({
        id: scenario.monthlyBudgetCategory.one.id,
      })) as MonthlyBudgetCategory
      const result = await updateMonthlyBudgetCategory({
        id: original.id,
        input: {
          monthlyBudgetId: scenario.monthlyBudgetCategory.two.monthlyBudgetId,
        },
      })

      expect(result.monthlyBudgetId).toEqual(
        scenario.monthlyBudgetCategory.two.monthlyBudgetId
      )
    }
  )

  scenario(
    'deletes a monthlyBudgetCategory',
    async (scenario: StandardScenario) => {
      const original = (await deleteMonthlyBudgetCategory({
        id: scenario.monthlyBudgetCategory.one.id,
      })) as MonthlyBudgetCategory
      const result = await monthlyBudgetCategory({ id: original.id })

      expect(result).toEqual(null)
    }
  )
})
