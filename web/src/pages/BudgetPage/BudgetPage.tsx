import { useEffect } from 'react'

import slugify from '@sindresorhus/slugify'
import type { FindBudgetName } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import { useQuery, Metadata } from '@redwoodjs/web'

import { Spreadsheet } from 'src/components/Spreadsheet'
import { useEinfachActions } from 'src/lib/store'

export const QUERY = gql`
  query FindBudgetName($budgetId: String!) {
    budget(id: $budgetId) {
      name
    }
  }
`
type BudgetPageProps = {
  budget: string
  slug: string
}

const BudgetPage = ({ budget, slug }: BudgetPageProps) => {
  const { data, loading } = useQuery<FindBudgetName>(QUERY, {
    variables: {
      budgetId: budget,
    },
  })

  useEffect(() => {
    const generated = slugify(data?.budget?.name || '')
    if (data?.budget?.name && slug !== generated) {
      navigate(routes.budgetSlug({ budget, slug: generated }), {
        replace: true,
      })
    }
  }, [data?.budget?.name, budget, slug])

  const { updateBudgetId } = useEinfachActions()

  useEffect(() => {
    if (!loading) {
      if (data?.budget && budget.trim() !== '') {
        updateBudgetId(budget)
      } else {
        navigate(routes.oops(), { replace: true })
        updateBudgetId('')
      }
    }
  }, [data, loading, budget, updateBudgetId])

  const getBudgetName = () =>
    data?.budget === null ? 'Budget' : data?.budget.name

  return (
    <>
      <Metadata title={getBudgetName()} description="Budget page" />

      {!loading ? <Spreadsheet budgetId={budget} /> : null}
    </>
  )
}

export default BudgetPage
