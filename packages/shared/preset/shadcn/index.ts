import pandaPreset from '@pandacss/preset-panda'
import type { Config } from '@pandacss/types'

import { breakpoints } from './breakpoints'
import { conditions } from './conditions'
import { globalCss } from './global-css'
import { keyframes } from './keyframes'
import { layerStyles } from './layer-styles'
import { recipes } from './recipes'
import { semanticTokens } from './semantic-tokens'
import { slotRecipes } from './slot-recipes'
import { textStyles } from './text-styles'
import { tokens } from './tokens'
import { utilities } from './utilities'

const defineConfig = <T extends Config>(config: T) => config

export const einfachPreset = defineConfig({
  presets: [pandaPreset],
  globalCss,
  conditions,
  utilities,
  theme: {
    extend: {
      tokens,
      semanticTokens,
      breakpoints,
      textStyles,
      keyframes,
      recipes,
      slotRecipes,
      layerStyles,
    },
  },
})

export default einfachPreset
