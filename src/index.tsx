/* @refresh reload */
import 'solid-devtools'
import { createRouter, RouterProvider } from '@tanstack/solid-router'
import { render } from 'solid-js/web'

import './index.css'
import { routeTree } from './routeTree.gen.ts'

const root = document.getElementById('root')

const router = createRouter({ routeTree })

render(
  () => (
    <RouterProvider
      router={router}
      context={{ isAuthenticated: () => !!localStorage.getItem('token') }}
    />
  ),
  root!,
)
