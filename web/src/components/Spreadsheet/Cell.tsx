import { useState, useEffect } from 'react'

import { type Row, type Getter, Column, Table } from '@tanstack/react-table'
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

export const CEditableCurrency = ({
  getValue,
  row,
  column,
  table,
}: {
  getValue: Getter<number>
  row: Row<MonthlyBudget>
  column: Column<MonthlyBudget>
  table: Table<MonthlyBudget>
}) => {
  const format = (str: string) => {
    let res = parseFloat(str.replace(/[^0-9,]/g, '').replace(',', '.'))
    res = isNaN(res) ? 0 : res

    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2,
    }).format(res)
  }

  const initialValue = format(getValue().toString())
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  const tableMeta = table.options.meta as {
    updateData: (rowIndex: number[], columnId: string, value: string) => void
  }

  const onBlur = () => {
    tableMeta.updateData(
      [row.getParentRow().index, row.index],
      column.id,
      value
    )
    setValue(format(value))
  }

  return (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={onBlur}
    />
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
