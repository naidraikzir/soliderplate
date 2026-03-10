import type { FieldStore } from '@formisch/solid'
import type { JSX } from 'solid-js'
import { For, Match, Show, Switch } from 'solid-js'

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

type TFormSelectProps<TMultiple extends boolean> = {
  class?: string
  label?: JSX.Element
  placeholder?: string
  description?: string
  options: TOption[]
  value?: TMultiple extends true ? TOption[] | null : TOption | null
  onChange: TMultiple extends true
    ? (value: TOption[] | null) => void
    : (value: TOption | null) => void
  onInputChange?: (value: string) => void
  errors?: FieldStore['errors'] | null
  multiple?: TMultiple
  disabled?: boolean
}

export function FormSelect<T extends boolean = false>(props: TFormSelectProps<T>) {
  return (
    // @ts-expect-error - Kobalte's types don't support dynamic multiple selection
    <Combobox<TOption>
      class={props.class}
      triggerMode="focus"
      options={props.options}
      optionValue="value"
      optionTextValue="label"
      optionLabel="label"
      optionDisabled="disabled"
      placeholder={props.placeholder}
      value={props.value}
      onChange={(val: TOption | TOption[] | undefined) => props.onChange((val ?? null) as any)}
      onInputChange={props.onInputChange}
      validationState={props.errors ? 'invalid' : 'valid'}
      itemComponent={(itemProps) => (
        <ComboboxItem item={itemProps.item}>
          <ComboboxItemLabel>{itemProps.item.rawValue.label}</ComboboxItemLabel>
        </ComboboxItem>
      )}
      multiple={props.multiple}
      disabled={props.disabled}
    >
      <ComboboxLabel>{props.label}</ComboboxLabel>
      <ComboboxControl<TOption> class="h-auto">
        {(state) => (
          <Switch>
            <Match when={!props.multiple}>
              <ComboboxInput class="flex-1" />
              <ComboboxTrigger />
            </Match>
            <Match when={props.multiple}>
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
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="size-3">
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
              </div>
              <ComboboxTrigger />
            </Match>
          </Switch>
        )}
      </ComboboxControl>
      <Show when={props.description}>
        <ComboboxDescription>{props.description}</ComboboxDescription>
      </Show>
      <Show when={props.errors}>
        <ComboboxErrorMessage class="text-xs">{props.errors?.[0]}</ComboboxErrorMessage>
      </Show>
      <ComboboxPortal>
        <ComboboxContent />
      </ComboboxPortal>
    </Combobox>
  )
}
