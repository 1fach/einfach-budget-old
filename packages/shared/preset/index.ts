import type { Config } from '@pandacss/types'

import shadcnPreset from '../../shared/preset/shadcn'

import { slotRecipes } from './slot-recipes'

const defineConfig = <T extends Config>(config: T) => config

export const oneUiPreset = defineConfig({
  presets: [shadcnPreset],
  theme: {
    extend: {
      slotRecipes,
    },
  },
  conditions: {
    extend: {
      today: '&:is([data-today])',
    },
  },
})

export default oneUiPreset
