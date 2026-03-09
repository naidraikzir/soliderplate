import { createForm, Field, Form } from '@formisch/solid'

import { FormInput } from '@/components/forms/form-input'
import { Button } from '@/components/ui/button'

import { LoginSchema } from '../schema'
import { login } from '../services'

export function LoginForm({ onSuccess }: { onSuccess?: () => void }) {
  const loginForm = createForm({
    schema: LoginSchema,
    validate: 'submit',
  })

  function submit(values: { username: string }) {
    login(values)
    onSuccess?.()
  }

  return (
    <Form of={loginForm} onSubmit={submit} class="grid grid-cols-1 gap-2 max-w-xs">
      <Field of={loginForm} path={['username']}>
        {(field) => (
          <FormInput
            {...field.props}
            label="Username"
            placeholder="Username..."
            onChange={field.onInput}
            errors={field.errors}
          />
        )}
      </Field>
      <Button type="submit" class="justify-self-end">
        Login
      </Button>
    </Form>
  )
}
