import { Checkbox } from '@einfach-ui/react'
import { type Table } from '@tanstack/react-table'
import { ChevronDown, ChevronRight } from 'lucide-react'

import type { MonthlyBudget } from './columns'

export const HCheckbox = ({ table }: { table: Table<MonthlyBudget> }) => {
  const checked = table.getIsAllRowsSelected()
  return (
    <Checkbox
      borderColor="primary" // actually should already be primary without setting it again
      checked={checked}
      indeterminate={
        table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
      }
      onCheckedChange={() => table.toggleAllRowsSelected(!checked)}
    />
  )
}

export const HExpand = ({ table }: { table: Table<MonthlyBudget> }) => {
  return (
    <button onClick={table.getToggleAllRowsExpandedHandler()}>
      {table.getIsAllRowsExpanded() ? (
        <ChevronDown size={12} />
      ) : (
        <ChevronRight size={12} />
      )}
    </button>
  )
}
