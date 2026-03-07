import { createForm, Field, Form } from '@formisch/solid'
import { createFileRoute, redirect } from '@tanstack/solid-router'
import { minLength, pipe, string, object, optional, parse } from 'valibot'

const LoginSchema = object({
  username: pipe(
    string('Username must be a string'),
    minLength(3, 'Username must be at least 3 characters'),
  ),
})

const SearchSchema = object({
  redirect: optional(string()),
})

export const Route = createFileRoute('/_auth/login')({
  validateSearch: (search) => parse(SearchSchema, search),
  component: RouteComponent,
  beforeLoad: ({ context, search: { redirect: redirectTo } }) => {
    if (context.isAuthenticated) throw redirect({ to: redirectTo || '/' })
  },
})

function RouteComponent() {
  const navigate = Route.useNavigate()
  const { redirect } = Route.useSearch()()

  const loginForm = createForm({
    schema: LoginSchema,
    validate: 'submit',
  })

  function handleSubmit(_values: { username: string }) {
    const token = Math.random().toString(36).substring(2, 15)
    localStorage.setItem('token', token)
    navigate({ to: redirect || '/' })
  }

  return (
    <Form of={loginForm} onSubmit={handleSubmit}>
      <Field of={loginForm} path={['username']}>
        {(field) => (
          <div>
            <label>Username</label>
            <input {...field.props} value={field.input} type="text" />
            {field.errors && <span>{field.errors[0]}</span>}
          </div>
        )}
      </Field>
      <button type="submit">Login</button>
    </Form>
  )
}
