import { defineConfig } from '@rsbuild/core'
import { pluginReact } from '@rsbuild/plugin-react'
import { RsdoctorRspackPlugin } from '@rsdoctor/rspack-plugin'
import { TanStackRouterRspack } from '@tanstack/router-plugin/rspack'

export default defineConfig({
  plugins: [pluginReact()],
  output: {
    target: 'web',
    polyfill: 'usage',
  },
  tools: {
    rspack: {
      plugins: [
        TanStackRouterRspack({ target: 'react', autoCodeSplitting: true }),
        process.env.RSDOCTOR === 'true' &&
          new RsdoctorRspackPlugin({
            // plugin options
          }),
      ],
    },
  },
})
