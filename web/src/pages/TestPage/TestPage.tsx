import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

import { MonthPicker } from 'src/components/AppLayout/month-picker'

const TestPage = () => {
  return (
    <>
      <Metadata title="Test" description="Test page" />

      <h1>TestPage</h1>
      <p>
        Find me in <code>./web/src/pages/TestPage/TestPage.tsx</code>
      </p>
      <p>
        My default route is named <code>test</code>, link to me with `
        <Link to={routes.test()}>Test</Link>`
      </p>
      <div style={{ width: '20%' }}>
        <MonthPicker />
      </div>
    </>
  )
}

export default TestPage
