import { useColorMode } from '@kobalte/core'
import { createFileRoute, Outlet, redirect } from '@tanstack/solid-router'

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
    <main class="grid gap-2 p-2">
      <header class="flex items-center gap-4">
        <Button onClick={onLogout}>Logout</Button>
        <Button variant="ghost" size="icon" onClick={toggleColorMode}>
          <span class="[html[data-kb-theme=light]_&]:icon-[lucide--sun] [html[data-kb-theme=dark]_&]:icon-[lucide--moon]" />
        </Button>
      </header>

      <Outlet />
    </main>
  )
}
