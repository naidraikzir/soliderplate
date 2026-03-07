import { Outlet, createRootRouteWithContext } from '@tanstack/solid-router'

type TRouterContext = {
  isAuthenticated?: () => boolean
}

export const Route = createRootRouteWithContext<TRouterContext>()({
  component: Outlet,
})
