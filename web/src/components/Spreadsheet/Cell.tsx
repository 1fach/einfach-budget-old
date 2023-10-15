import { type Row, type Getter } from '@tanstack/react-table'
import { ChevronDown, ChevronRight } from 'lucide-react'

import type { MonthlyBudget } from './columns'

import { Checkbox } from '@/ui/checkbox'

export const CCheckbox = ({ row }: { row: Row<MonthlyBudget> }) => {
  return (
    <Checkbox
      borderColor="primary" // actually should already be primary without setting it again
      checked={row.getIsSelected() || row.getIsAllSubRowsSelected()}
      indeterminate={row.getIsSomeSelected()}
      onCheckedChange={() => {
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
        <button onClick={row.getToggleExpandedHandler()}>
          {row.getIsExpanded() ? (
            <ChevronDown size={12} />
          ) : (
            <ChevronRight size={12} />
          )}
        </button>
      ) : null}
    </>
  )
}

export const CCurrency = ({ getValue }: { getValue: Getter<number> }) => {
  const formatted = new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
  }).format(getValue())

  return <span>{formatted}</span>
}

export const CCategory = ({ getValue }: { getValue: Getter<string> }) => {
  return <div>{getValue()}</div>
}
