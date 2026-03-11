import type { FieldStore } from '@formisch/solid'
import { For, Show, type JSX } from 'solid-js'

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

type TFormRadioProps = {
  orientation?: 'horizontal' | 'vertical'
  class?: string
  label?: JSX.Element
  options: TOption[]
  value?: TOption | null
  onChange: (value: string) => void
  errors?: FieldStore['errors'] | null
  disabled?: boolean
}

export function FormRadio(props: TFormRadioProps) {
  return (
    <div class={props.class}>
      <RadioGroup
        orientation={props.orientation}
        value={props.value?.value || ''}
        onChange={props.onChange}
        validationState={props.errors ? 'invalid' : 'valid'}
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
        <Show when={props.errors}>
          <RadioGroupErrorMessage class="text-xs data-disabled:opacity-50">
            {props.errors?.[0]}
          </RadioGroupErrorMessage>
        </Show>
      </RadioGroup>
    </div>
  )
}
