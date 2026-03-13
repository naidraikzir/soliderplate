import {
  Field,
  type FieldStore,
  type FormStore,
  type RequiredPath,
  type Schema,
  type ValidPath,
} from '@formisch/solid'
import { For, type JSX, Show } from 'solid-js'
import * as v from 'valibot'

import { cx } from '@/lib/cva'

import { Checkbox, CheckboxControl, CheckboxInput, CheckboxLabel } from '../ui/checkbox'

type TFormCheckboxGroupProps<TSchema extends Schema, TFieldPath extends RequiredPath> = {
  of: FormStore<TSchema>
  path: ValidPath<v.InferInput<TSchema>, TFieldPath>
  class?: string
  label?: JSX.Element
  options: {
    label: string
    value: string
    disabled?: boolean
  }[]
  disabled?: boolean
}

type TFieldInput<TSchema extends Schema, TFieldPath extends RequiredPath> = FieldStore<
  TSchema,
  TFieldPath
>['input']

export function FormCheckboxGroup<TSchema extends Schema, TFieldPath extends RequiredPath>(
  props: TFormCheckboxGroupProps<TSchema, TFieldPath>,
) {
  return (
    <Field of={props.of} path={props.path}>
      {(field) => {
        function getArrayValue(): string[] {
          const input = field.input
          return Array.isArray(input) ? input : []
        }

        function setArrayValue(arr: string[]) {
          field.onInput(arr as TFieldInput<TSchema, TFieldPath>)
        }

        function handleChange(checked: boolean, value: string) {
          const current = getArrayValue()
          setArrayValue(
            checked ? [...current, value] : current.filter((item: string) => item !== value),
          )
        }

        return (
          <div class={cx('self-start grid gap-3', props.class)}>
            <span
              class="text-sm font-medium select-none data-disabled:opacity-50 data-invalid:text-destructive"
              data-invalid={field.errors}
              data-disabled={props.disabled ? '' : undefined}
            >
              {props.label}
            </span>
            <div class="flex gap-3 gap-x-4 gap-y-2 flex-col">
              <For each={props.options}>
                {(option) => (
                  <Checkbox
                    class="flex gap-2"
                    checked={getArrayValue().includes(option.value)}
                    onChange={(checked) => handleChange(checked, option.value)}
                    validationState={field.errors ? 'invalid' : 'valid'}
                    disabled={props.disabled}
                  >
                    <CheckboxInput />
                    <CheckboxControl class="mt-0.5" />
                    <div class="grid gap-2">
                      <CheckboxLabel class="leading-5">{props.label}</CheckboxLabel>
                    </div>
                  </Checkbox>
                )}
              </For>
              <Show when={field.errors}>
                <div
                  class="text-destructive text-xs data-disabled:opacity-50"
                  data-disabled={props.disabled ? '' : undefined}
                >
                  {field.errors?.[0]}
                </div>
              </Show>
            </div>
          </div>
        )
      }}
    </Field>
  )
}
