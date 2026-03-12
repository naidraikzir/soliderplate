import {
  Field,
  type FormStore,
  type PartialValues,
  type PathValue,
  type RequiredPath,
  type Schema,
  type ValidPath,
} from '@formisch/solid'
import { For, type JSX, Show } from 'solid-js'
import * as v from 'valibot'

import { cx } from '@/lib/cva'

import { FormCheckbox } from './form-checkbox'

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

export function FormCheckboxGroup<TSchema extends Schema, TFieldPath extends RequiredPath>(
  props: TFormCheckboxGroupProps<TSchema, TFieldPath>,
) {
  type TFieldInput = PartialValues<PathValue<v.InferInput<TSchema>, TFieldPath>>

  return (
    <Field of={props.of} path={props.path}>
      {(field) => {
        function getArrayValue(): string[] {
          const input = field.input
          return Array.isArray(input) ? input : []
        }

        function setArrayValue(arr: string[]) {
          field.onInput(arr as TFieldInput)
        }

        function handleChange(checked: boolean, value: string) {
          const current = getArrayValue()
          setArrayValue(
            checked ? [...current, value] : current.filter((item: string) => item !== value),
          )
        }

        return (
          <div class={cx('grid gap-3', props.class)}>
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
                  <FormCheckbox
                    label={option.label}
                    checked={getArrayValue().includes(option.value)}
                    onChange={(checked) => handleChange(checked, option.value)}
                    disabled={option.disabled ?? props.disabled}
                  />
                )}
              </For>
              <Show when={field.errors}>
                <div class="text-destructive text-xs">{field.errors?.[0]}</div>
              </Show>
            </div>
          </div>
        )
      }}
    </Field>
  )
}
