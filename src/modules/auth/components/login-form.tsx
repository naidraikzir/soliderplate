import { createForm, Form } from '@formisch/solid'

import { FormInput } from '@/components/forms/form-input'
import { Button } from '@/components/ui/button'

import { loginSchema, type TLoginSchema } from '../schema'
import { login } from '../services'

export function LoginForm({ onSuccess }: { onSuccess?: () => void }) {
  const loginForm = createForm({
    schema: loginSchema,
    validate: 'submit',
  })

  function submit(values: TLoginSchema) {
    login(values)
    onSuccess?.()
  }

  return (
    <Form of={loginForm} onSubmit={submit} class="grid grid-cols-1 gap-2 max-w-sm mx-auto p-4">
      <FormInput of={loginForm} path={['username']} label="Username" placeholder="Username..." />
      <FormInput
        of={loginForm}
        path={['password']}
        type="password"
        label="Password"
        placeholder="********"
      />
      <Button type="submit" class="justify-self-end">
        Login
      </Button>
    </Form>
  )
}
