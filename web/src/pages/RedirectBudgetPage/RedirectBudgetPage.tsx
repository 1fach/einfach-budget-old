import { useEffect } from 'react'

import slugify from '@sindresorhus/slugify'
import type { FindBudgetName } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import { useQuery, Metadata } from '@redwoodjs/web'

import { useEinfachActions } from 'src/lib/store'

import { QUERY } from '../BudgetPage/BudgetPage'

type RedirectBudgetPageProps = {
  budget: string
}

const RedirectBudgetPage = ({ budget }: RedirectBudgetPageProps) => {
  const { data, loading } = useQuery<FindBudgetName>(QUERY, {
    variables: {
      budgetId: budget,
    },
  })
  const { updateBudgetId } = useEinfachActions()

  const getBudgetName = () =>
    data?.budget === null ? 'Budget' : data?.budget.name

  useEffect(() => {
    if (data?.budget?.name) {
      navigate(
        routes.budgetSlug({ budget, slug: slugify(data?.budget.name) }),
        {
          replace: true,
        }
      )
    }
  }, [data?.budget?.name, budget])

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

  return <Metadata title={getBudgetName()} description="Budget page" />
}

export default RedirectBudgetPage
