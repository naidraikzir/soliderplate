import tailwindcss from '@tailwindcss/vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import solidDevtools from 'solid-devtools/vite'
import solid from 'vite-plugin-solid'
import { defineConfig } from 'vite-plus'

export default defineConfig({
  lint: { options: { typeAware: true, typeCheck: true } },
  fmt: {
    semi: false,
    singleQuote: true,
    experimentalSortImports: {},
    ignorePatterns: ['src/components/ui/**'],
  },
  staged: {
    '*.{ts,tsx}': ['vp lint --type-aware', 'vp fmt --no-error-on-unmatched-pattern'],
  },
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
  ] as const,
  resolve: {
    tsconfigPaths: true,
  },
})
