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
  Checkbox,
  CheckboxControl,
  CheckboxDescription,
  CheckboxInput,
  CheckboxLabel,
} from '../ui/checkbox'

type TFormCheckboxProps<TSchema extends Schema, TFieldPath extends RequiredPath> = {
  of: FormStore<TSchema>
  path: ValidPath<v.InferInput<TSchema>, TFieldPath>
  class?: string
  label?: JSX.Element
  description?: string
  disabled?: boolean
}

type TFieldInput<TSchema extends Schema, TFieldPath extends RequiredPath> = FieldStore<
  TSchema,
  TFieldPath
>['input']

export function FormCheckbox<TSchema extends Schema, TFieldPath extends RequiredPath>(
  props: TFormCheckboxProps<TSchema, TFieldPath>,
) {
  return (
    <Field of={props.of} path={props.path}>
      {(field) => (
        <div class={props.class}>
          <Checkbox
            class="flex gap-2"
            checked={field.input as boolean}
            onChange={(checked) => field.onInput(checked as TFieldInput<TSchema, TFieldPath>)}
            validationState={field.errors ? 'invalid' : 'valid'}
            disabled={props.disabled}
          >
            <CheckboxInput />
            <CheckboxControl class="mt-0.5" />
            <div class="grid gap-2">
              <CheckboxLabel class="leading-5">{props.label}</CheckboxLabel>
              <Show when={props.description}>
                <CheckboxDescription>{props.description}</CheckboxDescription>
              </Show>
            </div>
            <Show when={field.errors}>
              <div class="text-destructive text-xs data-disabled:opacity-50">
                {field.errors?.[0]}
              </div>
            </Show>
          </Checkbox>
        </div>
      )}
    </Field>
  )
}
