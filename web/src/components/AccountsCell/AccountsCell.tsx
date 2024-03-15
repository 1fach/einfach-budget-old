import type { AccountsQuery, AccountsQueryVariables } from 'types/graphql'

import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import {
  SidebarSection,
  SidebarSectionSkeleton,
} from '../AppLayout/sidebar-section'

export const QUERY: TypedDocumentNode<
  AccountsQuery,
  AccountsQueryVariables
> = gql`
  query AccountsQuery($budgetId: String!) {
    accounts(budgetId: $budgetId) {
      id
      nickname
      balance
    }
  }
`

export const Loading = () => <SidebarSectionSkeleton title="Accounts" />

export const Empty = () => null

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ accounts }: CellSuccessProps<AccountsQuery>) => {
  const accountsSidebar = accounts.map((account) => ({
    title: account.nickname + ' - ' + account.balance,
    link: '#',
  }))

  return <SidebarSection title="Accounts" items={accountsSidebar} />
}
