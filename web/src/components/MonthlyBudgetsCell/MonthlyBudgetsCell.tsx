import type { FindBudgetByMonth } from 'types/graphql'

import { Redirect } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import { columns } from 'src/components/Spreadsheet/columns'
import {
  DataTable,
  DataTableSkeleton,
} from 'src/components/Spreadsheet/data-table'

import { convertBudgetGQLIntoDisplayable } from './convertData'

export const QUERY = gql`
  query FindBudgetByMonth(
    $userId: String!
    $budgetId: String!
    $month: Int!
    $year: Int!
  ) {
    budget(id: $budgetId, userId: $userId) {
      id
      name
      budgetCategoryGroups {
        name
        sortOrder
        monthlyCategoryGroupActivity(month: $month, year: $year) {
          assigned
          activity
          available
        }
        budgetCategories {
          name
          sortOrder
          monthlyBudgetPerCategory(month: $month, year: $year) {
            month
            year
            assigned
            monthlyCategoryActivity {
              activity
              available
            }
          }
        }
      }
    }
  }
`

export const Loading = () => <DataTableSkeleton />

export const Empty = () => <Redirect to="/404" />

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ budget }: CellSuccessProps<FindBudgetByMonth>) => {
  return (
    <DataTable
      columns={columns}
      data={convertBudgetGQLIntoDisplayable(budget)}
    />
  )
}
