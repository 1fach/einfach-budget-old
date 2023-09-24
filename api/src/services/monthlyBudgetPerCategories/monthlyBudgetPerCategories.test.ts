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
          month: 7463182,
          year: 5431675,
          budgetCategoryId:
            scenario.monthlyBudgetPerCategory.two.budgetCategoryId,
        },
      })

      expect(result.month).toEqual(7463182)
      expect(result.year).toEqual(5431675)
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
        input: { month: 8795059 },
      })

      expect(result.month).toEqual(8795059)
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
