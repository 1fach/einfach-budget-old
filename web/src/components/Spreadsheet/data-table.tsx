import { Checkbox, Skeleton, Table } from '@einfach-ui/react'
import { cx, css } from '@einfach-ui/styled/css'
import {
  ColumnDef,
  ExpandedState,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getExpandedRowModel,
} from '@tanstack/react-table'
import { ChevronRight } from 'lucide-react'

import { MonthlyBudget } from './columns'

export type DataTableProps<TData> = {
  readonly columns: ColumnDef<TData>[]
  readonly data: TData[]
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
    <Table.Root>
      <Table.Header>
        {table.getHeaderGroups().map((headerGroup) => (
          <Table.Row key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <Table.Head
                  key={header.id}
                  colSpan={header.colSpan}
                  className={cx(
                    (header.id === 'checkAll' || header.id === 'expandAll') &&
                      css({ width: '6' })
                  )}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </Table.Head>
              )
            })}
          </Table.Row>
        ))}
      </Table.Header>
      <Table.Body>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <Table.Row
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
                  <Table.Cell
                    key={cell.id}
                    className={cx(
                      (cell.column.id === 'checkAll' ||
                        cell.column.id === 'expandAll') &&
                        css({ width: '6' })
                    )}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Table.Cell>
                )
              })}
            </Table.Row>
          ))
        ) : (
          <Table.Row>
            <Table.Cell
              colSpan={columns.length}
              className={css({ h: '24', textAlign: 'center' })}
            >
              No results.
            </Table.Cell>
          </Table.Row>
        )}
      </Table.Body>
    </Table.Root>
  )
}

export const DataTableSkeleton = () => {
  return (
    <Table.Root>
      <Table.Header className={css({ textTransform: 'uppercase' })}>
        <Table.Row>
          <Table.Head className={css({ width: '6' })}>
            <Checkbox />
          </Table.Head>
          <Table.Head className={css({ width: '6' })}>
            <button>
              <ChevronRight size={12} />
            </button>
          </Table.Head>
          <Table.Head>Category</Table.Head>
          <Table.Head>Assigned</Table.Head>
          <Table.Head>Activity</Table.Head>
          <Table.Head>Available</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {Array.from({ length: 6 }, (_, index) => (
          <Table.Row
            className={css({
              '&[data-expandable=true]': {
                bg: 'secondary',
              },
            })}
            key={index}
          >
            <Table.Cell className={css({ width: '6' })}>
              <Checkbox />
            </Table.Cell>
            <Table.Cell className={css({ width: '6' })}></Table.Cell>
            <Table.Cell>
              <Skeleton height="4" width="44" borderRadius="sm" />
            </Table.Cell>
            <Table.Cell>
              <Skeleton height="4" width="44" borderRadius="sm" />
            </Table.Cell>
            <Table.Cell>
              <Skeleton height="4" width="44" borderRadius="sm" />
            </Table.Cell>
            <Table.Cell>
              <Skeleton height="4" width="44" borderRadius="sm" />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  )
}
