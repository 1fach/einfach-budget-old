import { css } from '@one-ui/styled-system/css'
import { styled, Grid, GridItem } from '@one-ui/styled-system/jsx'

import MonthlyBudgetsCell from 'src/components/MonthlyBudgetsCell'

import { DataTableSkeleton } from './data-table'

type Props = { budgetId?: string }

export const Spreadsheet = ({ budgetId }: Props) => {
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

const Header = () => {
  return <styled.header height="full" bg="secondary"></styled.header>
}

const BudgetTable = ({ budgetId }: Props) => {
  const { month, year } = { month: 11, year: 2023 }

  return (
    <styled.section flex={1}>
      {budgetId == null ? (
        <DataTableSkeleton />
      ) : (
        <MonthlyBudgetsCell budgetId={budgetId} month={month} year={year} />
      )}
    </styled.section>
  )
}

const Inspector = () => {
  return <styled.aside width="full" bg="secondary"></styled.aside>
}
