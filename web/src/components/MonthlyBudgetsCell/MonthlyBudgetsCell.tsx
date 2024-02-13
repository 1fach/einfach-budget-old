import type { FindBudgetByMonth } from 'types/graphql'

import { Redirect, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import { columns } from 'src/components/Spreadsheet/columns'
import {
  DataTable,
  DataTableSkeleton,
} from 'src/components/Spreadsheet/data-table'

export const QUERY = gql`
  query FindBudgetByMonth(
    $userId: String!
    $budgetId: String!
    $month: Int!
    $year: Int!
  ) {
    monthlyBudget(id: $budgetId, userId: $userId, month: $month, year: $year) {
      id
      category: name
      assigned
      activity
      available
      subRows {
        id
        category: name
        assigned
        activity
        available
      }
    }
  }
`

export const Loading = () => <DataTableSkeleton />

export const Empty = () => (
  <Redirect to={routes.home()} options={{ replace: true }} />
)

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  monthlyBudget,
}: CellSuccessProps<FindBudgetByMonth>) => {
  return <DataTable columns={columns} data={monthlyBudget} />
}
