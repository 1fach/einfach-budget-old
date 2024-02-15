import { Redirect, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

import { useSelectedBudgetId } from 'src/lib/store'

const HomePage = () => {
  const selectedBudgetId = useSelectedBudgetId()
  if (selectedBudgetId.trim() !== '') {
    return <Redirect to={routes.budget({ id: selectedBudgetId })} />
  }

  return (
    <>
      <Metadata title="Home" description="Home page" />
    </>
  )
}

export default HomePage
