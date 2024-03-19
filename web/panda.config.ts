import { einfachUiPreset } from '@einfach-ui/panda-preset'
import { defineConfig } from '@pandacss/dev'

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Classnames prefix
  prefix: 'einfach',

  // Minify generated css files
  minify: true,

  // Clean the output directory before build
  clean: true,

  // Hashes the classnames in the production environment only
  hash: process.env.NODE_ENV === 'production',

  // Uses JSX style props
  jsxFramework: 'react',

  // Where to look for your css declarations
  include: ['./src/**/*.{js,jsx,ts,tsx}'],

  presets: [einfachUiPreset],
  outdir: '../packages/styled',
  importMap: '@einfach-ui/styled',
})
