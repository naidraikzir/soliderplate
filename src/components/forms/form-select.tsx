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

import { Badge } from '../ui/badge'
import {
  Combobox,
  ComboboxContent,
  ComboboxControl,
  ComboboxDescription,
  ComboboxErrorMessage,
  ComboboxInput,
  ComboboxItem,
  ComboboxItemLabel,
  ComboboxLabel,
  ComboboxPortal,
  ComboboxTrigger,
} from '../ui/combobox'

type TOption = {
  label: string
  value: string
  disabled?: boolean
}

type TFormSelectProps<
  TSchema extends Schema,
  TFieldPath extends RequiredPath,
  TMultiple extends boolean,
> = {
  of: FormStore<TSchema>
  path: ValidPath<v.InferInput<TSchema>, TFieldPath>
  class?: string
  label?: JSX.Element
  placeholder?: string
  description?: string
  options: TOption[]
  onInputChange?: (value: string) => void
  multiple?: TMultiple
  disabled?: boolean
}

type TFieldInput<TSchema extends Schema, TFieldPath extends RequiredPath> = FieldStore<
  TSchema,
  TFieldPath
>['input']

export function FormSelect<
  TSchema extends Schema,
  TFieldPath extends RequiredPath,
  TMultiple extends boolean = false,
>(props: TFormSelectProps<TSchema, TFieldPath, TMultiple>) {
  return (
    <Field of={props.of} path={props.path}>
      {(field) => (
        <Show
          when={props.multiple}
          fallback={
            <Combobox<TOption>
              class={cx('grid gap-2 space-y-0', props.class)}
              triggerMode="focus"
              options={props.options}
              optionValue={(option) => option.value}
              optionTextValue={(option) => option.label}
              optionLabel={(option) => option.label}
              optionDisabled={(option) => option.disabled ?? false}
              placeholder={props.placeholder}
              value={props.options.find((o) => o.value === field.input) ?? null}
              onChange={(v: TOption | null) =>
                field.onInput((v?.value ?? '') as TFieldInput<TSchema, TFieldPath>)
              }
              onInputChange={props.onInputChange}
              validationState={field.errors ? 'invalid' : 'valid'}
              itemComponent={(itemProps) => (
                <ComboboxItem item={itemProps.item}>
                  <ComboboxItemLabel>{itemProps.item.rawValue.label}</ComboboxItemLabel>
                </ComboboxItem>
              )}
              disabled={props.disabled}
            >
              <ComboboxLabel>{props.label}</ComboboxLabel>
              <ComboboxControl<TOption> class="h-auto">
                <ComboboxInput class="flex-1" />
                <ComboboxTrigger />
              </ComboboxControl>
              <Show when={props.description}>
                <ComboboxDescription>{props.description}</ComboboxDescription>
              </Show>
              <Show when={field.errors}>
                <ComboboxErrorMessage class="text-xs">{field.errors?.[0]}</ComboboxErrorMessage>
              </Show>
              <ComboboxPortal>
                <ComboboxContent class="data-closed:animate-none!" />
              </ComboboxPortal>
            </Combobox>
          }
        >
          <Combobox<TOption>
            class={cx('grid gap-2 space-y-0', props.class)}
            triggerMode="focus"
            options={props.options}
            optionValue={(option) => option.value}
            optionTextValue={(option) => option.label}
            optionLabel={(option) => option.label}
            optionDisabled={(option) => option.disabled ?? false}
            placeholder={props.placeholder}
            value={props.options.filter((o) => (field.input as string[]).includes(o.value))}
            onChange={(v: TOption[] | null) => {
              const values = v?.map((o) => o.value) ?? []
              field.onInput(values as TFieldInput<TSchema, TFieldPath>)
            }}
            onInputChange={props.onInputChange}
            validationState={field.errors ? 'invalid' : 'valid'}
            itemComponent={(itemProps) => (
              <ComboboxItem item={itemProps.item}>
                <ComboboxItemLabel>{itemProps.item.rawValue.label}</ComboboxItemLabel>
              </ComboboxItem>
            )}
            multiple
            disabled={props.disabled}
          >
            <ComboboxLabel>{props.label}</ComboboxLabel>
            <ComboboxControl<TOption> class="h-auto">
              {(state) => (
                <div class="flex flex-wrap items-center gap-1 flex-1">
                  <For each={state.selectedOptions()}>
                    {(option) => (
                      <Badge class="rounded-sm">
                        {option.label}
                        <button
                          type="button"
                          class="rounded-full"
                          onClick={() => {
                            state.remove(option)
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            class="size-3"
                          >
                            <path
                              fill="none"
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M18 6L6 18M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </Badge>
                    )}
                  </For>
                  <ComboboxInput class="flex-1" />
                  <ComboboxTrigger />
                </div>
              )}
            </ComboboxControl>
            <Show when={props.description}>
              <ComboboxDescription>{props.description}</ComboboxDescription>
            </Show>
            <Show when={field.errors}>
              <ComboboxErrorMessage class="text-xs">{field.errors?.[0]}</ComboboxErrorMessage>
            </Show>
            <ComboboxPortal>
              <ComboboxContent class="data-closed:animate-none!" />
            </ComboboxPortal>
          </Combobox>
        </Show>
      )}
    </Field>
  )
}
