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
  const navigate = Route.useNavigate()

  function onLogout() {
    logout()
    void navigate({ to: '/login' })
  }

  return (
    <main class="grid gap-2 p-2">
      <header>
        <Button onClick={onLogout}>Logout</Button>
      </header>

      <Outlet />
    </main>
  )
}
