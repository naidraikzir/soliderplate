/* @refresh reload */
import 'solid-devtools'
import { ColorModeProvider, ColorModeScript, cookieStorageManagerSSR } from '@kobalte/core'
import { createRouter, RouterProvider } from '@tanstack/solid-router'
import { render } from 'solid-js/web'

import './index.css'
import { routeTree } from './routeTree.gen.ts'

const root = document.getElementById('root')

const router = createRouter({ routeTree })

render(() => {
  const storageManager = cookieStorageManagerSSR(document.cookie)

  return (
    <>
      <ColorModeScript storageType={storageManager.type} />
      <ColorModeProvider storageManager={storageManager}>
        <RouterProvider
          router={router}
          context={{ isAuthenticated: () => !!localStorage.getItem('token') }}
        />
      </ColorModeProvider>
    </>
  )
}, root!)
