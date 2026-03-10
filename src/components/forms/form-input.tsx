import type { FieldStore } from '@formisch/solid'
import { Show, type JSX } from 'solid-js'

import { TextField, TextFieldErrorMessage, TextFieldInput, TextFieldLabel } from '../ui/text-field'

type TFormInputProps = {
  class?: string
  type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url'
  label?: JSX.Element
  placeholder?: string
  value?: string
  onChange: (value: string) => void
  errors?: FieldStore['errors'] | null
  disabled?: boolean
}

export function FormInput(props: TFormInputProps) {
  return (
    <TextField
      class={props.class}
      value={props.value}
      onChange={props.onChange}
      validationState={props.errors ? 'invalid' : 'valid'}
      disabled={props.disabled}
    >
      <TextFieldLabel>{props.label}</TextFieldLabel>
      <TextFieldInput type={props.type} placeholder={props.placeholder} />
      <Show when={props.errors}>
        <TextFieldErrorMessage class="text-xs">{props.errors?.[0]}</TextFieldErrorMessage>
      </Show>
    </TextField>
  )
}
