import type { FieldStore } from '@formisch/solid'
import { Show, type JSX } from 'solid-js'

import { cx } from '@/lib/cva'

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
    <Checkbox
      class={cx('flex items-start gap-2', props.class)}
      checked={props.checked}
      onChange={props.onChange}
      validationState={props.errors ? 'invalid' : 'valid'}
      disabled={props.disabled}
    >
      <CheckboxInput />
      <CheckboxControl />
      <div class="grid gap-2 mt-0.5">
        <CheckboxLabel>{props.label}</CheckboxLabel>
        <Show when={props.description}>
          <CheckboxDescription>{props.description}</CheckboxDescription>
        </Show>
      </div>
      <Show when={props.errors}>
        <div class="text-destructive text-xs">{props.errors?.[0]}</div>
      </Show>
    </Checkbox>
  )
}
