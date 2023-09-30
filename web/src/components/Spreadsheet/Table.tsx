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
import { makeData, type Budget } from './makeData'
import classes from './Table.module.css'

export const Table = () => {
  const columnHelper = createColumnHelper<Budget>()

  const [expanded, setExpanded] = React.useState<ExpandedState>(true)
  const [data] = React.useState(() => makeData(2, 2))
  const [columns] = React.useState<ColumnDef<Budget>[]>(() => [
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
      cell: ({ getValue }) => <span>€ {getValue()}.00</span>,
    }),
    columnHelper.accessor('activity', {
      header: () => <span>Activity</span>,
      cell: ({ getValue }) => <span>€ {getValue()}.00</span>,
    }),
    columnHelper.accessor('available', {
      header: () => <span>Available</span>,
      cell: ({ getValue }) => <span>€ {getValue()}.00</span>,
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
