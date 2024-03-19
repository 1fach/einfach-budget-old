import * as React from 'react'

import { styled } from '@einfach-ui/styled/jsx'
import {
  tableContainer,
  table,
  tableHeader,
  tableBody,
  tableFooter,
  tableHead,
  tableRow,
  tableCell,
  tableCaption,
} from '@einfach-ui/styled/recipes'

const TableContainer = styled('div', tableContainer)

const BaseTable = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>((props, ref) => (
  <TableContainer>
    <table ref={ref} {...props} />
  </TableContainer>
))
BaseTable.displayName = 'Table'

export const Root = styled(BaseTable, table)
export const Header = styled('thead', tableHeader)
export const Body = styled('tbody', tableBody)
export const Footer = styled('tfoot', tableFooter)
export const Head = styled('th', tableHead)
export const Row = styled('tr', tableRow)
export const Cell = styled('td', tableCell)
export const Caption = styled('caption', tableCaption)
