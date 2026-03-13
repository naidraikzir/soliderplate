import {
  Field,
  type FieldStore,
  type FormStore,
  type RequiredPath,
  type Schema,
  type ValidPath,
} from '@formisch/solid'
import { Show, type JSX } from 'solid-js'
import * as v from 'valibot'

import {
  TextField,
  TextFieldErrorMessage,
  TextFieldLabel,
  TextFieldTextArea,
} from '../ui/text-field'

type TFormTextareaProps<TSchema extends Schema, TFieldPath extends RequiredPath> = {
  of: FormStore<TSchema>
  path: ValidPath<v.InferInput<TSchema>, TFieldPath>
  class?: string
  label?: JSX.Element
  placeholder?: string
  disabled?: boolean
}

type TFieldInput<TSchema extends Schema, TFieldPath extends RequiredPath> = FieldStore<
  TSchema,
  TFieldPath
>['input']

export function FormTextarea<TSchema extends Schema, TFieldPath extends RequiredPath>(
  props: TFormTextareaProps<TSchema, TFieldPath>,
) {
  return (
    <Field of={props.of} path={props.path}>
      {(field) => (
        <div class={props.class}>
          <TextField
            value={field.input as string}
            onChange={(value) => field.onInput(value as TFieldInput<TSchema, TFieldPath>)}
            validationState={field.errors ? 'invalid' : 'valid'}
            disabled={props.disabled}
          >
            <TextFieldLabel>{props.label}</TextFieldLabel>
            <TextFieldTextArea placeholder={props.placeholder} autoResize />
            <Show when={field.errors}>
              <TextFieldErrorMessage class="text-xs data-disabled:opacity-50">
                {field.errors?.[0]}
              </TextFieldErrorMessage>
            </Show>
          </TextField>
        </div>
      )}
    </Field>
  )
}
