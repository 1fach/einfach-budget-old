import type { Config } from '@pandacss/types'

export const conditions: Config['conditions'] = {
  extend: {
    closed: '&:is([data-state=closed])',
    open: '&:is([open], [data-state=open])',
    hidden: '&:is([hidden])',
    today: '&:is([data-today])',
  },
}
