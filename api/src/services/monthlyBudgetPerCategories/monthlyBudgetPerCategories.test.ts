import type { MonthlyBudgetPerCategory } from '@prisma/client'

import {
  monthlyBudgetPerCategories,
  monthlyBudgetPerCategory,
  createMonthlyBudgetPerCategory,
  updateMonthlyBudgetPerCategory,
  deleteMonthlyBudgetPerCategory,
} from './monthlyBudgetPerCategories'
import type { StandardScenario } from './monthlyBudgetPerCategories.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('monthlyBudgetPerCategories', () => {
  scenario(
    'returns all monthlyBudgetPerCategories',
    async (scenario: StandardScenario) => {
      const result = await monthlyBudgetPerCategories()

      expect(result.length).toEqual(
        Object.keys(scenario.monthlyBudgetPerCategory).length
      )
    }
  )

  scenario(
    'returns a single monthlyBudgetPerCategory',
    async (scenario: StandardScenario) => {
      const result = await monthlyBudgetPerCategory({
        id: scenario.monthlyBudgetPerCategory.one.id,
      })

      expect(result).toEqual(scenario.monthlyBudgetPerCategory.one)
    }
  )

  scenario(
    'creates a monthlyBudgetPerCategory',
    async (scenario: StandardScenario) => {
      const result = await createMonthlyBudgetPerCategory({
        input: {
          assigned: 1000000,
          month: 7947810,
          year: 4286586,
          budgetCategoryId:
            scenario.monthlyBudgetPerCategory.two.budgetCategoryId,
        },
      })

      expect(result.month).toEqual(7947810)
      expect(result.year).toEqual(4286586)
      expect(result.budgetCategoryId).toEqual(
        scenario.monthlyBudgetPerCategory.two.budgetCategoryId
      )
    }
  )

  scenario(
    'updates a monthlyBudgetPerCategory',
    async (scenario: StandardScenario) => {
      const original = (await monthlyBudgetPerCategory({
        id: scenario.monthlyBudgetPerCategory.one.id,
      })) as MonthlyBudgetPerCategory
      const result = await updateMonthlyBudgetPerCategory({
        id: original.id,
        input: { month: 6505550 },
      })

      expect(result.month).toEqual(6505550)
    }
  )

  scenario(
    'deletes a monthlyBudgetPerCategory',
    async (scenario: StandardScenario) => {
      const original = (await deleteMonthlyBudgetPerCategory({
        id: scenario.monthlyBudgetPerCategory.one.id,
      })) as MonthlyBudgetPerCategory
      const result = await monthlyBudgetPerCategory({ id: original.id })

      expect(result).toEqual(null)
    }
  )
})
