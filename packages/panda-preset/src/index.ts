import type { Config } from '@pandacss/types'

import shadcnPreset from './shadcn'
import { slotRecipes } from './slot-recipes'

const defineConfig = <T extends Config>(config: T) => config

export const einfachUiPreset = defineConfig({
  presets: [shadcnPreset],
  theme: {
    extend: {
      slotRecipes,
    },
  },
})

export default einfachUiPreset
