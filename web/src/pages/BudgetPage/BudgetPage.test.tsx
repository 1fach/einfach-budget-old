import { render } from '@redwoodjs/testing/web'

import BudgetPage from './BudgetPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('BudgetPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<BudgetPage id="" />)
    }).not.toThrow()
  })
})
