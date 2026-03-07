import { createFileRoute, Outlet, redirect } from '@tanstack/solid-router'

export const Route = createFileRoute('/_app')({
  component: Outlet,
  beforeLoad({ context, location: { pathname } }) {
    if (!context.isAuthenticated?.()) {
      throw redirect({
        to: '/login',
        search: { redirect: pathname.length > 1 ? pathname : undefined },
      })
    }
  },
})
