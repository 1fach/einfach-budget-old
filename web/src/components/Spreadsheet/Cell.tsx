import { Checkbox, UnstyledButton } from '@mantine/core'
import { IconChevronDown, IconChevronRight } from '@tabler/icons-react'
import { type Row, type Getter } from '@tanstack/react-table'

import type { MonthlyBudget } from './Table'

export const CCheckbox = ({ row }: { row: Row<MonthlyBudget> }) => {
  return (
    <Checkbox
      size="xs"
      checked={row.getIsSelected() || row.getIsAllSubRowsSelected()}
      indeterminate={row.getIsSomeSelected()}
      onChange={() => {
        if (row.getCanExpand()) {
          row.toggleSelected(!row.getIsAllSubRowsSelected())
        } else {
          row.toggleSelected()
        }
      }}
    />
  )
}

export const CExpand = ({ row }: { row: Row<MonthlyBudget> }) => {
  return (
    <>
      {row.getCanExpand() ? (
        <UnstyledButton onClick={row.getToggleExpandedHandler()}>
          {row.getIsExpanded() ? (
            <IconChevronDown size={12} />
          ) : (
            <IconChevronRight size={12} />
          )}
        </UnstyledButton>
      ) : null}
    </>
  )
}

export const CCategory = ({ getValue }: { getValue: Getter<string> }) => {
  return <div>{getValue()}</div>
}
