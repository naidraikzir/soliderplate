import { paraglideVitePlugin } from '@inlang/paraglide-js'
import tailwindcss from '@tailwindcss/vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import solidDevtools from 'solid-devtools/vite'
import solid from 'vite-plugin-solid'
import { defineConfig } from 'vite-plus'

export default defineConfig({
  lint: {
    options: {
      typeAware: true,
      typeCheck: true,
    },
    jsPlugins: ['eslint-plugin-solid'],
    rules: {
      'solid/jsx-no-undef': 'error',
      'solid/no-destructure': 'error',
      'solid/prefer-for': 'warn',
      'solid/reactivity': 'error',
    },
  },
  fmt: {
    semi: false,
    singleQuote: true,
    experimentalSortImports: {},
    ignorePatterns: ['src/components/ui/**', 'src/routeTree.gen.ts'],
  },
  staged: {
    '*.{ts,tsx}': ['vp lint --type-aware', 'vp fmt --no-error-on-unmatched-pattern'],
  },
  plugins: [
    paraglideVitePlugin({
      project: './project.inlang',
      outdir: './src/paraglide',
    }),
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
