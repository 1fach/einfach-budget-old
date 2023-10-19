import pandaPreset from '@pandacss/preset-panda'
import type { Config } from '@pandacss/types'
import shadowPandaPreset from '@shadow-panda/preset'

import { slotRecipes } from './recipes'

const defineConfig = <T extends Config>(config: T) => config

export const oneUiPreset = defineConfig({
  presets: [pandaPreset, shadowPandaPreset],
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
