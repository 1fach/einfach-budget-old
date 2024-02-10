import type { ComponentProps } from 'react'

import { DatePicker } from '@ark-ui/react/date-picker'
import { createStyleContext } from '@one-ui/shared/style-context'
import { styled } from '@one-ui/styled-system/jsx'
import { datePicker } from '@one-ui/styled-system/recipes'

const { withProvider, withContext } = createStyleContext(datePicker)

export const Root = withProvider(styled(DatePicker.Root), 'root')
export const ClearTrigger = withContext(
  styled(DatePicker.ClearTrigger),
  'clearTrigger'
)
export const Content = withContext(styled(DatePicker.Content), 'content')
export const Control = withContext(styled(DatePicker.Control), 'control')
export const Input = withContext(styled(DatePicker.Input), 'input')
export const Label = withContext(styled(DatePicker.Label), 'label')
export const MonthSelect = withContext(
  styled(DatePicker.MonthSelect),
  'monthSelect'
)
export const NextTrigger = withContext(
  styled(DatePicker.NextTrigger),
  'nextTrigger'
)
export const Positioner = withContext(
  styled(DatePicker.Positioner),
  'positioner'
)
export const PrevTrigger = withContext(
  styled(DatePicker.PrevTrigger),
  'prevTrigger'
)
export const RangeText = withContext(styled(DatePicker.RangeText), 'rangeText')
export const Table = withContext(styled(DatePicker.Table), 'table')
export const TableBody = withContext(styled(DatePicker.TableBody), 'tableBody')
export const TableCell = withContext(styled(DatePicker.TableCell), 'tableCell')
export const TableCellTrigger = withContext(
  styled(DatePicker.TableCellTrigger),
  'tableCellTrigger'
)
export const TableHead = withContext(styled(DatePicker.TableHead), 'tableHead')
export const TableHeader = withContext(
  styled(DatePicker.TableHeader),
  'tableHeader'
)
export const TableRow = withContext(styled(DatePicker.TableRow), 'tableRow')
export const Trigger = withContext(styled(DatePicker.Trigger), 'trigger')
export const View = withContext(styled(DatePicker.View), 'view')
export const ViewControl = withContext(
  styled(DatePicker.ViewControl),
  'viewControl'
)
export const ViewTrigger = withContext(
  styled(DatePicker.ViewTrigger),
  'viewTrigger'
)
export const YearSelect = withContext(
  styled(DatePicker.YearSelect),
  'yearSelect'
)

export type RootProps = ComponentProps<typeof Root>
export type ClearTriggerProps = ComponentProps<typeof ClearTrigger>
export type ContentProps = ComponentProps<typeof Content>
export type ControlProps = ComponentProps<typeof Control>
export type InputProps = ComponentProps<typeof Input>
export type LabelProps = ComponentProps<typeof Label>
export type MonthSelectProps = ComponentProps<typeof MonthSelect>
export type NextTriggerProps = ComponentProps<typeof NextTrigger>
export type PositionerProps = ComponentProps<typeof Positioner>
export type PrevTriggerProps = ComponentProps<typeof PrevTrigger>
export type RangeTextProps = ComponentProps<typeof RangeText>
export type TableProps = ComponentProps<typeof Table>
export type TableBodyProps = ComponentProps<typeof TableBody>
export type TableCellProps = ComponentProps<typeof TableCell>
export type TableCellTriggerProps = ComponentProps<typeof TableCellTrigger>
export type TableHeadProps = ComponentProps<typeof TableHead>
export type TableHeaderProps = ComponentProps<typeof TableHeader>
export type TableRowProps = ComponentProps<typeof TableRow>
export type TriggerProps = ComponentProps<typeof Trigger>
export type ViewProps = ComponentProps<typeof View>
export type ViewControlProps = ComponentProps<typeof ViewControl>
export type ViewTriggerProps = ComponentProps<typeof ViewTrigger>
export type YearSelectProps = ComponentProps<typeof YearSelect>
