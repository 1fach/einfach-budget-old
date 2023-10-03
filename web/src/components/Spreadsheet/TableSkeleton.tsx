import { Checkbox, Skeleton, Table, UnstyledButton } from '@mantine/core'
import { IconChevronRight } from '@tabler/icons-react'

import classes from './Table.module.css'

export const TableSkeleton = () => {
  return (
    <Table>
      <Table.Thead className={classes.tableHead}>
        <Table.Tr>
          <Table.Th className={classes.checkAll}>
            <Checkbox size="xs" />
          </Table.Th>
          <Table.Th className={classes.expandAll}>
            <UnstyledButton>
              <IconChevronRight size={12} />
            </UnstyledButton>
          </Table.Th>
          <Table.Th>Category</Table.Th>
          <Table.Th>Assigned</Table.Th>
          <Table.Th>Activity</Table.Th>
          <Table.Th>Available</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {Array.from({ length: 20 }, (_, index) => (
          <TableSkeletonRow key={index} />
        ))}
      </Table.Tbody>
    </Table>
  )
}

const TableSkeletonRow = () => {
  return (
    <Table.Tr className={classes.tableRow}>
      <Table.Td className={classes.checkAll}>
        <Checkbox size="xs" />
      </Table.Td>
      <Table.Td className={classes.expandAll}></Table.Td>
      <Table.Td>
        <Skeleton height={15} width={180} radius="sm" />
      </Table.Td>
      <Table.Td>
        <Skeleton height={15} width={180} radius="sm" />
      </Table.Td>
      <Table.Td>
        <Skeleton height={15} width={180} radius="sm" />
      </Table.Td>
      <Table.Td>
        <Skeleton height={15} width={180} radius="sm" />
      </Table.Td>
    </Table.Tr>
  )
}
