import type { UserBudgetsQuery } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import { SidebarBudgetLink } from 'src/components/Layout/Sidebar/SidebarBudgetLinks'

export const QUERY = gql`
  query UserBudgetsQuery($userId: String!) {
    userBudgets: budgetsByUser(userId: $userId) {
      id
      name
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  userBudgets,
}: CellSuccessProps<UserBudgetsQuery>) => {
  return (
    <>
      {userBudgets.map((budget) => (
        <SidebarBudgetLink
          key={budget.id}
          name={budget.name}
          budgetId={budget.id}
        />
      ))}
    </>
  )
}
