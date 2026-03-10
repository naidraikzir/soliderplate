import type { FieldStore } from '@formisch/solid'
import type { JSX } from 'solid-js'

import {
  TextField,
  TextFieldErrorMessage,
  TextFieldLabel,
  TextFieldTextArea,
} from '../ui/text-field'

type TFormTextareaProps = {
  class?: string
  label?: JSX.Element
  placeholder?: string
  value?: string
  onChange: (value: string) => void
  errors?: FieldStore['errors'] | null
  disabled?: boolean
}

export function FormTextarea(props: TFormTextareaProps) {
  return (
    <TextField
      class={props.class}
      value={props.value}
      onChange={props.onChange}
      validationState={props.errors ? 'invalid' : 'valid'}
      disabled={props.disabled}
    >
      <TextFieldLabel>{props.label}</TextFieldLabel>
      <TextFieldTextArea placeholder={props.placeholder} />
      <TextFieldErrorMessage>{props.errors?.[0]}</TextFieldErrorMessage>
    </TextField>
  )
}
