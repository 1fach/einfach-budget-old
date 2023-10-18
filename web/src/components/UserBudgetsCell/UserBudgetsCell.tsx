import type { UserBudgetsQuery } from 'types/graphql'

import { routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import {
  SidebarSection,
  SidebarSectionSkeleton,
} from '../AppLayout/sidebar-section'

export const QUERY = gql`
  query UserBudgetsQuery($userId: String!) {
    userBudgets: budgetsByUser(userId: $userId) {
      id
      name
    }
  }
`

export const Loading = () => <SidebarSectionSkeleton title="Budgets" />

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  userBudgets,
}: CellSuccessProps<UserBudgetsQuery>) => {
  const budgetSidebar = userBudgets.map((budget) => ({
    title: budget.name,
    link: routes.budget({ id: budget.id }),
  }))

  return <SidebarSection title="Budgets" items={budgetSidebar} />
}
