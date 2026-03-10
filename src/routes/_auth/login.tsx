import { createFileRoute, redirect } from '@tanstack/solid-router'
import { string, object, optional, parse } from 'valibot'

import { LoginForm } from '@/modules/auth/components/login-form'

const SearchSchema = object({
  redirect: optional(string()),
})

export const Route = createFileRoute('/_auth/login')({
  validateSearch: (search) => parse(SearchSchema, search),
  component: RouteComponent,
  beforeLoad: ({ context, search: { redirect: redirectTo } }) => {
    if (context.isAuthenticated?.()) throw redirect({ to: redirectTo ?? '/' })
  },
})

function RouteComponent() {
  const navigate = Route.useNavigate()
  const searchParams = Route.useSearch()

  return <LoginForm onSuccess={() => navigate({ to: searchParams().redirect ?? '/' })} />
}
