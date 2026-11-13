import { QueryClientProvider } from '@tanstack/solid-query'
import { Outlet, createRootRouteWithContext } from '@tanstack/solid-router'

import { queryClient } from '@/query-client'

type TRouterContext = {
  isAuthenticated?: () => boolean
}

export const Route = createRootRouteWithContext<TRouterContext>()({
  component: () => (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  ),
})
