import { accountBalances } from './accountBalances'
import type { StandardScenario } from './accountBalances.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('accountBalances', () => {
  scenario(
    'returns all accountBalances',
    async (scenario: StandardScenario) => {
      const result = await accountBalances()

      expect(result.length).toEqual(Object.keys(scenario.accountBalance).length)
    }
  )
})
