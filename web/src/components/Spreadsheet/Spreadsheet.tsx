import { styled } from 'styled/jsx'

import MonthlyBudgetsCell from 'src/components/MonthlyBudgetsCell'

import { TableSkeleton } from './TableSkeleton'

type Props = { budgetId?: string }

export const Spreadsheet = ({ budgetId }: Props) => {
  return (
    <styled.div height="100dvh" overflow="hidden">
      <Header />
      <styled.div display="flex" width="full" height="full">
        <BudgetTable budgetId={budgetId} />
        <Inspector />
      </styled.div>
    </styled.div>
  )
}

const Header = () => {
  return (
    <styled.header
      height="1/6"
      bgColor="gray.100"
      borderBottomWidth="thin"
      borderBottomColor="gray.200"
    ></styled.header>
  )
}

const BudgetTable = ({ budgetId }: Props) => {
  const { month, year } = { month: 10, year: 2023 }

  return (
    <styled.section flex={1}>
      {budgetId == null ? (
        <TableSkeleton />
      ) : (
        <MonthlyBudgetsCell budgetId={budgetId} month={month} year={year} />
      )}
    </styled.section>
  )
}

const Inspector = () => {
  return (
    <styled.aside
      width="1/3"
      bgColor="gray.100"
      borderLeftWidth="thin"
      borderLeftColor="gray.200"
    ></styled.aside>
  )
}
