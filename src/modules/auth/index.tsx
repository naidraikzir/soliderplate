import { createForm, Field, Form } from '@formisch/solid'

import { Button } from '@/components/ui/button'
import {
  TextField,
  TextFieldErrorMessage,
  TextFieldInput,
  TextFieldLabel,
} from '@/components/ui/text-field'

import { LoginSchema } from './schema'
import { login } from './services'

export function LoginForm({ onSuccess }: { onSuccess?: () => void }) {
  const loginForm = createForm({
    schema: LoginSchema,
    validate: 'submit',
  })

  function submit(_values: { username: string }) {
    login()
    onSuccess?.()
  }

  return (
    <Form of={loginForm} onSubmit={submit} class="grid grid-cols-1 gap-2 max-w-xs">
      <Field of={loginForm} path={['username']}>
        {(field) => (
          <TextField
            value={field.input}
            onChange={field.onInput}
            validationState={field.errors ? 'invalid' : 'valid'}
          >
            <TextFieldLabel>Username</TextFieldLabel>
            <TextFieldInput {...field.props} type="text" />
            <TextFieldErrorMessage>{field.errors?.[0]}</TextFieldErrorMessage>
          </TextField>
        )}
      </Field>
      <Button type="submit">Login</Button>
    </Form>
  )
}
