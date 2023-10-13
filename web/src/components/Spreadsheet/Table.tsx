import { Table as MTable } from '@mantine/core'
import {
  useReactTable,
  createColumnHelper,
  getCoreRowModel,
  getExpandedRowModel,
  flexRender,
  type ExpandedState,
  type ColumnDef,
} from '@tanstack/react-table'

import { CExpand, CCheckbox, CCategory } from './Cell'
import { HExpand, HCheckbox } from './Header'
import classes from './Table.module.css'

export type MonthlyBudget = {
  category: string
  assigned: number
  activity: number
  available: number
  subRows?: MonthlyBudget[]
}

export const Table = ({ budgets }: { budgets: MonthlyBudget[] }) => {
  const columnHelper = createColumnHelper<MonthlyBudget>()

  const [expanded, setExpanded] = React.useState<ExpandedState>(true)
  const [data] = React.useState(budgets)
  const [columns] = React.useState<ColumnDef<MonthlyBudget>[]>(() => [
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
      cell: ({ getValue }) => <span>€ {getValue()}</span>,
    }),
    columnHelper.accessor('activity', {
      header: () => <span>Activity</span>,
      cell: ({ getValue }) => <span>€ {getValue()}</span>,
    }),
    columnHelper.accessor('available', {
      header: () => <span>Available</span>,
      cell: ({ getValue }) => <span>€ {getValue()}</span>,
    }),
  ])

  const table = useReactTable({
    data,
    columns,
    state: {
      expanded,
    },
    onExpandedChange: setExpanded,
    getSubRows: (row) => row.subRows,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    enableRowSelection: (row) => !(row.subRows && row.subRows.length > 0),
  })

  return (
    <MTable>
      <MTable.Thead className={classes.tableHead}>
        {table.getHeaderGroups().map((headerGroup) => (
          <MTable.Tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <MTable.Th
                  key={header.id}
                  colSpan={header.colSpan}
                  className={classes[`${header.id}`]}
                >
                  {header.isPlaceholder ? null : (
                    <div>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </div>
                  )}
                </MTable.Th>
              )
            })}
          </MTable.Tr>
        ))}
      </MTable.Thead>
      <MTable.Tbody>
        {table.getRowModel().rows.map((row) => {
          return (
            <MTable.Tr
              key={row.id}
              className={classes.tableRow}
              data-expandable={row.getCanExpand()}
              aria-expanded={row.getIsExpanded()}
            >
              {row.getVisibleCells().map((cell) => {
                return (
                  <MTable.Td
                    key={cell.id}
                    className={classes[`${cell.column.id}`]}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </MTable.Td>
                )
              })}
            </MTable.Tr>
          )
        })}
      </MTable.Tbody>
    </MTable>
  )
}
