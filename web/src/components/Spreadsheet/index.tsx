import { useEffect } from 'react'

import { css } from '@einfach-ui/styled/css'
import { styled, Grid, GridItem } from '@einfach-ui/styled/jsx'

import { useMutation } from '@redwoodjs/web'

import BudgetingCell from 'src/components/BudgetingCell'
import { useSelectedMonth, useSelectedYear } from 'src/lib/store'

type Props = { budgetId?: string }

const MONTHLY_BUDGET_INIT = gql`
  mutation MonthlyBudgetInit($input: MonthlyBudgetInitInput!) {
    monthlyBudgetInit(input: $input) {
      categories {
        id
      }
    }
  }
`

export const Spreadsheet = ({ budgetId }: Props) => {
  const month = useSelectedMonth()
  const year = useSelectedYear()

  const [monthlyBudgetInit] = useMutation(MONTHLY_BUDGET_INIT)

  useEffect(() => {
    monthlyBudgetInit({
      variables: {
        input: {
          budgetId,
          month,
          year,
        },
      },
    })
  }, [monthlyBudgetInit, month, year, budgetId])

  return (
    <Grid gridTemplateColumns={4} minH="100vh">
      <GridItem
        colSpan={3}
        gridTemplateRows={6}
        className={css({ display: 'grid' })}
      >
        <BudgetingCell budgetId={budgetId} month={month} year={year} />
      </GridItem>
      <Inspector />
    </Grid>
  )
}

const Inspector = () => {
  return <styled.aside width="full" bg="secondary"></styled.aside>
}
