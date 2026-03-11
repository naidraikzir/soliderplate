import type { FieldStore } from '@formisch/solid'
import { Show, type JSX } from 'solid-js'

import {
  Checkbox,
  CheckboxControl,
  CheckboxDescription,
  CheckboxInput,
  CheckboxLabel,
} from '../ui/checkbox'

type TFormCheckboxProps = {
  class?: string
  label?: JSX.Element
  description?: string
  checked?: boolean
  onChange: (checked: boolean) => void
  errors?: FieldStore['errors'] | null
  disabled?: boolean
}

export function FormCheckbox(props: TFormCheckboxProps) {
  return (
    <div class={props.class}>
      <Checkbox
        class="flex gap-2"
        checked={props.checked}
        onChange={props.onChange}
        validationState={props.errors ? 'invalid' : 'valid'}
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
        <Show when={props.errors}>
          <div class="text-destructive text-xs">{props.errors?.[0]}</div>
        </Show>
      </Checkbox>
    </div>
  )
}
