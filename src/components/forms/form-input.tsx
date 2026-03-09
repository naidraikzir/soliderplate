import type { JSX } from 'solid-js'

import { TextField, TextFieldErrorMessage, TextFieldInput, TextFieldLabel } from '../ui/text-field'

type TFormInputProps = {
  class?: string
  label?: JSX.Element
  placeholder?: string
  value?: string
  onChange: (value: string) => void
  errors?: [string, ...string[]] | null
}

export function FormInput(props: TFormInputProps) {
  return (
    <TextField
      class={props.class}
      value={props.value}
      onChange={props.onChange}
      validationState={props.errors ? 'invalid' : 'valid'}
    >
      <TextFieldLabel>{props.label}</TextFieldLabel>
      <TextFieldInput type="text" placeholder={props.placeholder} />
      <TextFieldErrorMessage>{props.errors?.[0]}</TextFieldErrorMessage>
    </TextField>
  )
}
