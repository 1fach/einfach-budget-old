import { Skeleton } from '@einfach-ui/react'
import type {
  FindBudgetByMonth,
  FindBudgetByMonthVariables,
} from 'types/graphql'

import { Redirect, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import { columns } from 'src/components/Spreadsheet/columns'
import {
  DataTable,
  DataTableSkeleton,
} from 'src/components/Spreadsheet/data-table'
import { MonthPicker } from 'src/components/Spreadsheet/month-picker'

import { styled, GridItem } from '@/styling/jsx'

export const QUERY = gql`
  query FindBudgetByMonth($budgetId: String!, $month: Int!, $year: Int!) {
    monthlyBudget(id: $budgetId, month: $month, year: $year) {
      budgetId: id
      name
      readyToAssign
      groups {
        id
        category: name
        assigned
        activity
        available
        subRows: categories {
          id
          category: name
          assigned
          activity
          available
        }
      }
    }
  }
`

export const Loading = () => {
  return (
    <>
      <styled.header
        height="full"
        bg="secondary"
        display="flex"
        flexDir="column"
        justifyContent="center"
        alignItems="center"
      >
        <Skeleton
          height="4"
          width="44"
          borderRadius="sm"
          background="background"
        />
        <MonthPicker />
      </styled.header>

      <GridItem rowSpan={5}>
        <styled.section flex={1}>
          <DataTableSkeleton />
        </styled.section>
      </GridItem>
    </>
  )
}

export const Empty = () => (
  <Redirect to={routes.home()} options={{ replace: true }} />
)

export const Failure = ({
  error,
}: CellFailureProps<FindBudgetByMonthVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  monthlyBudget,
}: CellSuccessProps<FindBudgetByMonth, FindBudgetByMonthVariables>) => {
  return (
    <>
      <styled.header
        height="full"
        bg="secondary"
        display="flex"
        flexDir="column"
        justifyContent="center"
        alignItems="center"
      >
        <styled.div background="red">{monthlyBudget.readyToAssign}</styled.div>
        <MonthPicker />
      </styled.header>

      <GridItem rowSpan={5}>
        <styled.section flex={1}>
          <DataTable columns={columns} data={monthlyBudget.groups} />
        </styled.section>
      </GridItem>
    </>
  )
}
