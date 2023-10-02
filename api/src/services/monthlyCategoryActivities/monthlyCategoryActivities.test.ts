import type { MonthlyCategoryActivity } from '@prisma/client'

import {
  monthlyCategoryActivities,
  monthlyCategoryActivity,
  createMonthlyCategoryActivity,
  updateMonthlyCategoryActivity,
  deleteMonthlyCategoryActivity,
} from './monthlyCategoryActivities'
import type { StandardScenario } from './monthlyCategoryActivities.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('monthlyCategoryActivities', () => {
  scenario(
    'returns all monthlyCategoryActivities',
    async (scenario: StandardScenario) => {
      const result = await monthlyCategoryActivities()

      expect(result.length).toEqual(
        Object.keys(scenario.monthlyCategoryActivity).length
      )
    }
  )

  scenario(
    'returns a single monthlyCategoryActivity',
    async (scenario: StandardScenario) => {
      const result = await monthlyCategoryActivity({
        id: scenario.monthlyCategoryActivity.one.id,
      })

      expect(result).toEqual(scenario.monthlyCategoryActivity.one)
    }
  )

  scenario(
    'creates a monthlyCategoryActivity',
    async (scenario: StandardScenario) => {
      const result = await createMonthlyCategoryActivity({
        input: {
          monthlyBudgetPerCategoryId:
            scenario.monthlyCategoryActivity.two.monthlyBudgetPerCategoryId,
        },
      })

      expect(result.monthlyBudgetPerCategoryId).toEqual(
        scenario.monthlyCategoryActivity.two.monthlyBudgetPerCategoryId
      )
    }
  )

  scenario(
    'updates a monthlyCategoryActivity',
    async (scenario: StandardScenario) => {
      const original = (await monthlyCategoryActivity({
        id: scenario.monthlyCategoryActivity.one.id,
      })) as MonthlyCategoryActivity
      const result = await updateMonthlyCategoryActivity({
        id: original.id,
        input: {
          monthlyBudgetPerCategoryId:
            scenario.monthlyCategoryActivity.two.monthlyBudgetPerCategoryId,
        },
      })

      expect(result.monthlyBudgetPerCategoryId).toEqual(
        scenario.monthlyCategoryActivity.two.monthlyBudgetPerCategoryId
      )
    }
  )

  scenario(
    'deletes a monthlyCategoryActivity',
    async (scenario: StandardScenario) => {
      const original = (await deleteMonthlyCategoryActivity({
        id: scenario.monthlyCategoryActivity.one.id,
      })) as MonthlyCategoryActivity
      const result = await monthlyCategoryActivity({ id: original.id })

      expect(result).toEqual(null)
    }
  )
})
