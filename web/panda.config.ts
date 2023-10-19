import { oneUiPreset } from '@one-ui/shared/preset'
import { defineConfig } from '@pandacss/dev'

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Classnames prefix
  prefix: 'one',

  // Minify generated css files
  minify: true,

  // Hashes the classnames to make it shorter
  hash: true,

  // Uses JSX style props
  jsxFramework: 'react',

  // Where to look for your css declarations
  include: ['./src/**/*.{js,jsx,ts,tsx}'],

  // Preset for shadcn/ui
  presets: [oneUiPreset],

  // Optional: Emit artifacts to `node_modules` as a package.
  // The copy-paste component examples use `@shadow-panda/styled-system` as the import path of the generated files.
  // If you choose not to use this option, you should rewrite your component imports as needed.
  // @see https://panda-css.com/docs/references/config#emitpackage
  emitPackage: true,
  outdir: '@one-ui/styled-system',
})
