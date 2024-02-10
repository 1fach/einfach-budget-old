import { createColumnHelper, ColumnDef } from '@tanstack/react-table'

import {
  CExpand,
  CCheckbox,
  CCategory,
  CCurrency,
  CEditableCurrency,
} from './cell'
import { HExpand, HCheckbox } from './header'

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type MonthlyBudget = {
  category: string
  assigned: number
  activity: number
  available: number
  subRows?: MonthlyBudget[]
}

const columnHelper = createColumnHelper<MonthlyBudget>()

export const columns: ColumnDef<MonthlyBudget>[] = [
  columnHelper.display({
    id: 'checkAll',
    header: ({ table }) => <HCheckbox table={table} />,
    cell: ({ row }) => <CCheckbox row={row} />,
  }),
  columnHelper.display({
    id: 'expandAll',
    header: ({ table }) => <HExpand table={table} />,
    cell: ({ row }) => <CExpand row={row} />,
  }),
  columnHelper.accessor('category', {
    header: () => <span>Category</span>,
    cell: ({ getValue }) => <CCategory getValue={getValue} />,
  }),
  columnHelper.accessor('assigned', {
    header: () => <span>Assigned</span>,
    cell: (props) =>
      props.row.getCanExpand() ? (
        <CCurrency getValue={props.getValue} />
      ) : (
        <CEditableCurrency {...props} />
      ),
  }),
  columnHelper.accessor('activity', {
    header: () => <span>Activity</span>,
    cell: ({ getValue }) => <CCurrency getValue={getValue} />,
  }),
  columnHelper.accessor('available', {
    header: () => <span>Available</span>,
    cell: ({ getValue }) => <CCurrency getValue={getValue} />,
  }),
]
