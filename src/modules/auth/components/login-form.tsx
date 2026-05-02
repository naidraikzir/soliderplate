import { createForm, Form } from '@formisch/solid'

import { FormInput } from '@/components/forms/form-input'
import { Button } from '@/components/ui/button'

import { loginSchema, type TLoginSchema } from '../schema'
import { login } from '../services'

export function LoginForm(props: { onSuccess?: () => void }) {
  const loginForm = createForm({
    schema: loginSchema,
    validate: 'submit',
  })

  function submit(values: TLoginSchema) {
    login(values)
    props.onSuccess?.()
  }

  return (
    <Form of={loginForm} onSubmit={submit} class="grid grid-cols-1 gap-4 max-w-sm mx-auto p-4">
      <div class="text-4xl capitalize font-heading font-extrabold">Login</div>

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
