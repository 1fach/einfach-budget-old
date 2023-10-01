import type { BudgetCategoryGroup } from '@prisma/client'

import {
  budgetCategoryGroups,
  budgetCategoryGroup,
  createBudgetCategoryGroup,
  updateBudgetCategoryGroup,
  deleteBudgetCategoryGroup,
} from './budgetCategoryGroups'
import type { StandardScenario } from './budgetCategoryGroups.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('budgetCategoryGroups', () => {
  scenario(
    'returns all budgetCategoryGroups',
    async (scenario: StandardScenario) => {
      const result = await budgetCategoryGroups()

      expect(result.length).toEqual(
        Object.keys(scenario.budgetCategoryGroup).length
      )
    }
  )

  scenario(
    'returns a single budgetCategoryGroup',
    async (scenario: StandardScenario) => {
      const result = await budgetCategoryGroup({
        id: scenario.budgetCategoryGroup.one.id,
      })

      expect(result).toEqual(scenario.budgetCategoryGroup.one)
    }
  )

  scenario(
    'creates a budgetCategoryGroup',
    async (scenario: StandardScenario) => {
      const result = await createBudgetCategoryGroup({
        input: {
          name: 'String',
          sortOrder: 731872,
          budgetId: scenario.budgetCategoryGroup.two.budgetId,
        },
      })

      expect(result.name).toEqual('String')
      expect(result.sortOrder).toEqual(731872)
      expect(result.budgetId).toEqual(scenario.budgetCategoryGroup.two.budgetId)
    }
  )

  scenario(
    'updates a budgetCategoryGroup',
    async (scenario: StandardScenario) => {
      const original = (await budgetCategoryGroup({
        id: scenario.budgetCategoryGroup.one.id,
      })) as BudgetCategoryGroup
      const result = await updateBudgetCategoryGroup({
        id: original.id,
        input: { name: 'String2' },
      })

      expect(result.name).toEqual('String2')
    }
  )

  scenario(
    'deletes a budgetCategoryGroup',
    async (scenario: StandardScenario) => {
      const original = (await deleteBudgetCategoryGroup({
        id: scenario.budgetCategoryGroup.one.id,
      })) as BudgetCategoryGroup
      const result = await budgetCategoryGroup({ id: original.id })

      expect(result).toEqual(null)
    }
  )
})
