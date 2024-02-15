import type { FindBudgetName } from 'types/graphql'

import { Metadata } from '@redwoodjs/web'
import { useQuery } from '@redwoodjs/web'

import { useAuth } from 'src/auth'
import { Spreadsheet } from 'src/components/Spreadsheet'
import { useEinfachActions } from 'src/lib/store'

const QUERY = gql`
  query FindBudgetName($userId: String!, $budgetId: String!) {
    budget(id: $budgetId, userId: $userId) {
      name
    }
  }
`

const BudgetPage = ({ id }: { id: string }) => {
  const { currentUser } = useAuth()

  const { data, loading } = useQuery<FindBudgetName>(QUERY, {
    variables: {
      userId: currentUser.id,
      budgetId: id,
    },
  })

  const { updateBudgetId } = useEinfachActions()
  if (id.trim() !== '') {
    updateBudgetId(id)
  }

  return (
    <>
      <Metadata
        title={loading ? 'Budget' : data.budget.name}
        description="Budget page"
      />

      <Spreadsheet budgetId={id} />
    </>
  )
}

export default BudgetPage
