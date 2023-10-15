import { css } from '@one-ui/styled-system/css'
import {
  ColumnDef,
  ExpandedState,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getExpandedRowModel,
} from '@tanstack/react-table'
import { clsx } from 'clsx'
import { ChevronRight } from 'lucide-react'

import { MonthlyBudget } from './columns'

import { Checkbox } from '@/ui/checkbox'
import { Skeleton } from '@/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/ui/table'

interface DataTableProps<TData> {
  columns: ColumnDef<TData>[]
  data: TData[]
}

export function DataTable({ columns, data }: DataTableProps<MonthlyBudget>) {
  const [expanded, setExpanded] = React.useState<ExpandedState>(true)

  const table = useReactTable({
    data,
    columns,
    state: {
      expanded,
    },
    getCoreRowModel: getCoreRowModel(),
    onExpandedChange: setExpanded,
    getSubRows: (row) => row.subRows,
    getExpandedRowModel: getExpandedRowModel(),
    enableRowSelection: (row) => !(row.subRows && row.subRows.length > 0),
  })

  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <TableHead
                  key={header.id}
                  colSpan={header.colSpan}
                  className={clsx({
                    [css({ width: '6' })]:
                      header.id === 'checkAll' || header.id === 'expandAll',
                  })}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              )
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              className={css({
                '&[data-expandable=true]': {
                  bg: 'secondary',
                },
              })}
              data-state={row.getIsSelected() && 'selected'}
              data-expandable={row.getCanExpand()}
              aria-expanded={row.getIsExpanded()}
            >
              {row.getVisibleCells().map((cell) => {
                return (
                  <TableCell
                    key={cell.id}
                    className={clsx({
                      [css({ width: '6' })]:
                        cell.column.id === 'checkAll' ||
                        cell.column.id === 'expandAll',
                    })}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                )
              })}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell
              colSpan={columns.length}
              className={css({ h: '24', textAlign: 'center' })}
            >
              No results.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}

export const DataTableSkeleton = () => {
  return (
    <Table>
      <TableHeader className={css({ textTransform: 'uppercase' })}>
        <TableRow>
          <TableHead className={css({ width: '6' })}>
            <Checkbox />
          </TableHead>
          <TableHead className={css({ width: '6' })}>
            <button>
              <ChevronRight size={12} />
            </button>
          </TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Assigned</TableHead>
          <TableHead>Activity</TableHead>
          <TableHead>Available</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: 6 }, (_, index) => (
          <TableRow
            className={css({
              '&[data-expandable=true]': {
                bg: 'secondary',
              },
            })}
            key={index}
          >
            <TableCell className={css({ width: '6' })}>
              <Checkbox />
            </TableCell>
            <TableCell className={css({ width: '6' })}></TableCell>
            <TableCell>
              <Skeleton height="4" width="44" borderRadius="sm" />
            </TableCell>
            <TableCell>
              <Skeleton height="4" width="44" borderRadius="sm" />
            </TableCell>
            <TableCell>
              <Skeleton height="4" width="44" borderRadius="sm" />
            </TableCell>
            <TableCell>
              <Skeleton height="4" width="44" borderRadius="sm" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
