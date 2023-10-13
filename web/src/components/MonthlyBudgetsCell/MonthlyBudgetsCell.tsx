import type { FindBudgetByMonth } from 'types/graphql'

import { Redirect } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import { Table } from 'src/components/Spreadsheet/Table'
import { TableSkeleton } from 'src/components/Spreadsheet/TableSkeleton'

import { convertBudgetGQLIntoDisplayable } from './convertData'

export const QUERY = gql`
  query FindBudgetByMonth($budgetId: String!, $month: Int!, $year: Int!) {
    budget(id: $budgetId) {
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

export const Loading = () => <TableSkeleton />

export const Empty = () => <Redirect to="/404" />

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ budget }: CellSuccessProps<FindBudgetByMonth>) => {
  return <Table budgets={convertBudgetGQLIntoDisplayable(budget)} />
}
