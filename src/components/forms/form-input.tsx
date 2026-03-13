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

import { TextField, TextFieldErrorMessage, TextFieldInput, TextFieldLabel } from '../ui/text-field'

type TFormInputProps<TSchema extends Schema, TFieldPath extends RequiredPath> = {
  of: FormStore<TSchema>
  path: ValidPath<v.InferInput<TSchema>, TFieldPath>
  class?: string
  type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url'
  label?: JSX.Element
  placeholder?: string
  disabled?: boolean
}

type TFieldInput<TSchema extends Schema, TFieldPath extends RequiredPath> = FieldStore<
  TSchema,
  TFieldPath
>['input']

export function FormInput<TSchema extends Schema, TFieldPath extends RequiredPath>(
  props: TFormInputProps<TSchema, TFieldPath>,
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
            <TextFieldInput type={props.type} placeholder={props.placeholder} />
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
