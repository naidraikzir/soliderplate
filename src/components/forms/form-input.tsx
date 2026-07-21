import {
  Field,
  type FieldStore,
  type FormSchema,
  type FormStore,
  type RequiredPath,
  type ValidPath,
} from '@formisch/solid'
import { splitProps, Show, type JSX } from 'solid-js'
import * as v from 'valibot'

import { cx } from '@/lib/cva'

import type { TextFieldInputProps } from '../ui/text-field'
import { TextField, TextFieldErrorMessage, TextFieldInput, TextFieldLabel } from '../ui/text-field'

type TFormInputProps<TSchema extends FormSchema, TFieldPath extends RequiredPath> = {
  of: FormStore<TSchema>
  path: ValidPath<v.InferInput<TSchema>, TFieldPath>
  class?: string
  type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url'
  label?: JSX.Element
  placeholder?: string
  disabled?: boolean
}

type TFieldInput<TSchema extends FormSchema, TFieldPath extends RequiredPath> = FieldStore<
  TSchema,
  TFieldPath
>['input']

type TFormInputPropsWithRest<
  TSchema extends FormSchema,
  TFieldPath extends RequiredPath,
> = TFormInputProps<TSchema, TFieldPath> &
  Omit<TextFieldInputProps, keyof TFormInputProps<TSchema, TFieldPath>>

export function FormInput<TSchema extends FormSchema, TFieldPath extends RequiredPath>(
  props: TFormInputPropsWithRest<TSchema, TFieldPath>,
) {
  const [fieldProps, inputProps] = splitProps(
    props as TFormInputPropsWithRest<TSchema, TFieldPath>,
    ['of', 'path', 'class', 'type', 'label', 'placeholder', 'disabled'],
  )

  return (
    <Field of={fieldProps.of} path={fieldProps.path}>
      {(field) => (
        <div class={cx('self-start', fieldProps.class)}>
          <TextField
            value={field.input as string}
            onChange={(value) => field.onInput(value as TFieldInput<TSchema, TFieldPath>)}
            validationState={field.errors ? 'invalid' : 'valid'}
            disabled={fieldProps.disabled}
          >
            <TextFieldLabel>{fieldProps.label}</TextFieldLabel>
            <TextFieldInput
              type={fieldProps.type}
              placeholder={fieldProps.placeholder}
              {...inputProps}
            />
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
