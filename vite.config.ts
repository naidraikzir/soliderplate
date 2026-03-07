import tailwindcss from '@tailwindcss/vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import solidDevtools from 'solid-devtools/vite'
import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [
    tailwindcss(),
    tanstackRouter({
      target: 'solid',
      autoCodeSplitting: true,
    }),
    solidDevtools({
      autoname: true,
    }),
    solid(),
    tsconfigPaths(),
  ],
})
