import { createFileRoute, Outlet, redirect } from '@tanstack/solid-router'

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

  function logout() {
    localStorage.removeItem('token')
    navigate({ to: '/login' })
  }

  return (
    <div>
      <header>
        <button class="bg-neutral-300 p-1 py-0.5" onClick={logout}>
          Logout
        </button>
      </header>

      <Outlet />
    </div>
  )
}
