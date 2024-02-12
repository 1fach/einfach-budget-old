import { useEffect } from 'react'

import { css } from '@one-ui/styled-system/css'
import { styled, Grid, GridItem } from '@one-ui/styled-system/jsx'

import { useQuery, useMutation } from '@redwoodjs/web'

import { useAuth } from 'src/auth'
import MonthlyBudgetsCell from 'src/components/MonthlyBudgetsCell'
import { useSelectedMonth, useSelectedYear } from 'src/lib/store'

import { DataTableSkeleton } from './data-table'
import { MonthPicker } from './month-picker'

type Props = { budgetId?: string }

const GET_BUDGET_CATEGORIES_WITH_NO_ASSIGNED = gql`
  query GetBudgetCategoriesWithNoAssigned(
    $budgetId: String!
    $month: Int!
    $year: Int!
  ) {
    budgetCategoriesWithNoAssignedFor(
      budgetId: $budgetId
      month: $month
      year: $year
    ) {
      id
    }
  }
`

const CREATE_EMPTY_BUDGET_FOR_CATEGORIES = gql`
  mutation CreateEmptyBudgetForCategories(
    $input: CreateEmptyBudgetForCategoriesInput!
  ) {
    createEmptyBudgetForCategories(input: $input) {
      count
    }
  }
`

export const Spreadsheet = ({ budgetId }: Props) => {
  const month = useSelectedMonth()
  const year = useSelectedYear()

  const { data } = useQuery(GET_BUDGET_CATEGORIES_WITH_NO_ASSIGNED, {
    variables: {
      budgetId: budgetId,
      month,
      year,
    },
  })

  const [createEmptyBudgetForCategories] = useMutation(
    CREATE_EMPTY_BUDGET_FOR_CATEGORIES
  )

  useEffect(() => {
    if (data?.budgetCategoriesWithNoAssignedFor.length > 0) {
      createEmptyBudgetForCategories({
        variables: {
          input: {
            categoryIds: data.budgetCategoriesWithNoAssignedFor.map(
              (category) => category.id
            ),
            month,
            year,
          },
        },
      })
    }
  }, [data, month, year, createEmptyBudgetForCategories])

  return (
    <Grid gridTemplateColumns={4} minH="100vh">
      <GridItem
        colSpan={3}
        gridTemplateRows={6}
        className={css({ display: 'grid' })}
      >
        <Header />
        <GridItem rowSpan={5}>
          <BudgetTable budgetId={budgetId} />
        </GridItem>
      </GridItem>
      <Inspector />
    </Grid>
  )
}

export const SpreadsheetSkeleton = () => {
  return (
    <Grid gridTemplateColumns={4} minH="100vh">
      <GridItem
        colSpan={3}
        gridTemplateRows={6}
        className={css({ display: 'grid' })}
      >
        <styled.header
          height="full"
          bg="secondary"
          display="flex"
          justifyContent="center"
          alignItems="center"
        ></styled.header>

        <GridItem rowSpan={5}>
          <styled.section flex={1}>
            <DataTableSkeleton />
          </styled.section>
        </GridItem>
      </GridItem>
      <Inspector />
    </Grid>
  )
}

const Header = () => {
  return (
    <styled.header
      height="full"
      bg="secondary"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <MonthPicker />
    </styled.header>
  )
}

const BudgetTable = ({ budgetId }: Props) => {
  const { currentUser } = useAuth()
  const month = useSelectedMonth()
  const year = useSelectedYear()

  return (
    <styled.section flex={1}>
      <MonthlyBudgetsCell
        userId={currentUser.id}
        budgetId={budgetId}
        month={month}
        year={year}
      />
    </styled.section>
  )
}

const Inspector = () => {
  return <styled.aside width="full" bg="secondary"></styled.aside>
}
