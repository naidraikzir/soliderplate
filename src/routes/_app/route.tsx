import { useColorMode } from '@kobalte/core'
import { createFileRoute, Link, Outlet, redirect } from '@tanstack/solid-router'
import { For } from 'solid-js'

import { LocaleSwitcher } from '@/components/locale-switcher'
import { Button } from '@/components/ui/button'
import { logout } from '@/modules/auth/services'

export const Route = createFileRoute('/_app')({
  component: RouteComponent,
  beforeLoad({ context, location: { pathname } }) {
    if (!context.isAuthenticated?.()) {
      throw redirect({
        to: '/login',
        search: { redirect: pathname.length > 1 ? pathname : undefined },
      })
    }
  },
})

function RouteComponent() {
  const { toggleColorMode } = useColorMode()
  const navigate = Route.useNavigate()

  function onLogout() {
    logout()
    void navigate({ to: '/login' })
  }

  return (
    <main class="grid grid-cols-1 gap-2 p-2">
      <header class="flex items-center justify-between gap-4">
        <div class="flex gap-2">
          <For each={links}>
            {({ to, label }) => (
              <Link to={to} class="px-2">
                {label}
              </Link>
            )}
          </For>
        </div>

        <div class="flex items-center gap-2">
          <LocaleSwitcher />
          <Button variant="ghost" size="icon-sm" onClick={toggleColorMode}>
            <span class="[html[data-kb-theme=light]_&]:icon-[lucide--sun] [html[data-kb-theme=dark]_&]:icon-[lucide--moon]" />
          </Button>
          <Button onClick={onLogout}>
            <span class="max-sm:icon-[lucide--log-out]" />
            <span class="hidden sm:inline">Logout</span>
          </Button>
        </div>
      </header>

      <div class="w-2xl max-w-full mx-auto">
        <Outlet />
      </div>
    </main>
  )
}

const links = [
  { to: '/', label: '/' },
  { to: '/form-example', label: 'Form' },
  { to: '/products', label: 'Products' },
]
