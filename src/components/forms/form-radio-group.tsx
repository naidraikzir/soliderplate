import {
  Field,
  type FieldStore,
  type FormStore,
  type RequiredPath,
  type Schema,
  type ValidPath,
} from '@formisch/solid'
import { For, Show, type JSX } from 'solid-js'
import * as v from 'valibot'

import { cx } from '@/lib/cva'

import {
  RadioGroup,
  RadioGroupErrorMessage,
  RadioGroupItem,
  RadioGroupItemControl,
  RadioGroupItemIndicator,
  RadioGroupItemInput,
  RadioGroupItemLabel,
  RadioGroupItems,
  RadioGroupLabel,
} from '../ui/radio-group'

type TOption = {
  label: string
  value: string
  disabled?: boolean
}

type TFormRadioProps<TSchema extends Schema, TFieldPath extends RequiredPath> = {
  of: FormStore<TSchema>
  path: ValidPath<v.InferInput<TSchema>, TFieldPath>
  orientation?: 'horizontal' | 'vertical'
  class?: string
  label?: JSX.Element
  options: TOption[]
  disabled?: boolean
}

type TFieldInput<TSchema extends Schema, TFieldPath extends RequiredPath> = FieldStore<
  TSchema,
  TFieldPath
>['input']

export function FormRadioGroup<TSchema extends Schema, TFieldPath extends RequiredPath>(
  props: TFormRadioProps<TSchema, TFieldPath>,
) {
  return (
    <Field of={props.of} path={props.path}>
      {(field) => (
        <div class={props.class}>
          <RadioGroup
            orientation={props.orientation}
            value={props.options.find((o) => o.value === field.input)?.value ?? ''}
            onChange={(value) => field.onInput(value as TFieldInput<TSchema, TFieldPath>)}
            validationState={field.errors ? 'invalid' : 'valid'}
            disabled={props.disabled}
          >
            <RadioGroupLabel class="data-disabled:opacity-50 data-invalid:text-destructive">
              {props.label}
            </RadioGroupLabel>
            <RadioGroupItems
              class={cx('gap-x-4 gap-y-2', { 'flex-col': props.orientation === 'vertical' })}
            >
              <For each={props.options}>
                {(item) => (
                  <RadioGroupItem class="gap-2 data-disabled:opacity-50" value={item.value}>
                    <RadioGroupItemInput />
                    <RadioGroupItemControl>
                      <RadioGroupItemIndicator />
                    </RadioGroupItemControl>
                    <RadioGroupItemLabel>{item.label}</RadioGroupItemLabel>
                  </RadioGroupItem>
                )}
              </For>
            </RadioGroupItems>
            <Show when={field.errors}>
              <RadioGroupErrorMessage class="text-xs data-disabled:opacity-50">
                {field.errors?.[0]}
              </RadioGroupErrorMessage>
            </Show>
          </RadioGroup>
        </div>
      )}
    </Field>
  )
}
