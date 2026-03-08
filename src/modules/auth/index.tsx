import { createForm, Field, Form } from '@formisch/solid'

import { LoginSchema } from './schema'

export function LoginForm({ onSuccess }: { onSuccess?: () => void }) {
  const loginForm = createForm({
    schema: LoginSchema,
    validate: 'submit',
  })

  function login(_values: { username: string }) {
    const token = Math.random().toString(36).substring(2, 15)
    localStorage.setItem('token', token)
    onSuccess?.()
  }

  return (
    <Form of={loginForm} onSubmit={login}>
      <Field of={loginForm} path={['username']}>
        {(field) => (
          <div>
            <label>Username</label>
            <input {...field.props} value={field.input} type="text" class="border" />
            {field.errors && <small>{field.errors[0]}</small>}
          </div>
        )}
      </Field>
      <button class="bg-neutral-300 p-1 py-0.5" type="submit">
        Login
      </button>
    </Form>
  )
}
