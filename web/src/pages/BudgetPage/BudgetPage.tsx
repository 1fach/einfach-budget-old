import { useEffect } from 'react'

import type { FindBudgetName } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import { useQuery, Metadata } from '@redwoodjs/web'

import { Spreadsheet } from 'src/components/Spreadsheet'
import { useEinfachActions } from 'src/lib/store'

const QUERY = gql`
  query FindBudgetName($budgetId: String!) {
    budget(id: $budgetId) {
      name
    }
  }
`

const BudgetPage = ({ budget }: { budget: string }) => {
  const { data, loading } = useQuery<FindBudgetName>(QUERY, {
    variables: {
      budgetId: budget,
    },
  })
  const { updateBudgetId } = useEinfachActions()

  const getBudgetName = () => (data.budget === null ? '' : data.budget.name)

  useEffect(() => {
    if (!loading) {
      if (data.budget && budget.trim() !== '') {
        updateBudgetId(budget)
      } else {
        navigate(routes.oops(), { replace: true })
      }
    }
  }, [data, loading, budget, updateBudgetId])

  return (
    <>
      <Metadata
        title={loading ? 'Budget' : getBudgetName()}
        description="Budget page"
      />

      {!loading ? <Spreadsheet budgetId={budget} /> : null}
    </>
  )
}

export default BudgetPage
