import { datePickerAnatomy } from '@ark-ui/anatomy'
import { defineSlotRecipe } from '@pandacss/dev'

export const datePicker = defineSlotRecipe({
  className: 'datePicker',
  slots: [...datePickerAnatomy.keys()],
  jsx: ['DatePicker', /DatePicker\.+/],
  base: {
    cellTrigger: {
      minWidth: '10',
      _today: {
        _before: {
          content: '"—"',
          color: 'accent.foreground',
          position: 'absolute',
          marginTop: '6',
        },
      },
      '&[data-in-range]': {
        bg: 'accent',
      },
      _selected: {
        _before: {
          color: 'accent.foreground',
        },
      },
    },
    content: {
      background: 'background',
      borderRadius: 'l3',
      borderWidth: '1px',
      p: '4',
      width: 'fit-content',
    },
    grid: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1',
      '&[data-type="day"] [data-part="row"]': {
        gridTemplateColumns: 'repeat(7, 1fr)',
      },
      '&[data-type="month"] [data-part="row"]': {
        gridTemplateColumns: 'repeat(4, 1fr)',
      },
      '&[data-type="year"] [data-part="row"]': {
        gridTemplateColumns: 'repeat(4, 1fr)',
      },
    },
    rowGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1',
    },
    row: {
      display: 'grid',
    },
    rowHeader: {
      display: 'grid',
      gridTemplateColumns: 'repeat(7, 1fr)',
    },
    columnHeader: {
      alignItems: 'center',
      color: 'accent.foreground',
      display: 'inline-flex',
      fontWeight: 'semibold',
      height: '10',
      justifyContent: 'center',
      textStyle: 'sm',
      width: '10',
    },
  },
})
