import dns from 'dns'

import type { UserConfig } from 'vite'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

import redwood from '@redwoodjs/vite'

// See: https://vitejs.dev/config/server-options.html#server-host
// So that Vite will load on local instead of 127.0.0.1
dns.setDefaultResultOrder('verbatim')

const viteConfig: UserConfig = {
  plugins: [redwood(), tsconfigPaths()],
  css: {
    modules: {
      generateScopedName: 'one-[local]__[hash:base64:5]',
    },
  },
}

export default defineConfig(viteConfig)
