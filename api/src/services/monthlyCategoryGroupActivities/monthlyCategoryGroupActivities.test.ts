import { monthlyCategoryGroupActivities } from './monthlyCategoryGroupActivities'
import type { StandardScenario } from './monthlyCategoryGroupActivities.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('monthlyCategoryGroupActivities', () => {
  scenario(
    'returns all monthlyCategoryGroupActivities',
    async (scenario: StandardScenario) => {
      const result = await monthlyCategoryGroupActivities()

      expect(result.length).toEqual(
        Object.keys(scenario.monthlyCategoryGroupActivity).length
      )
    }
  )
})
