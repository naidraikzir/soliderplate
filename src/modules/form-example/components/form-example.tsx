import { createForm, Field, Form, getInput, getAllErrors, reset } from '@formisch/solid'
import { createSignal } from 'solid-js'

import { FormCheckbox } from '@/components/forms/form-checkbox'
import { FormInput } from '@/components/forms/form-input'
import { FormRadio } from '@/components/forms/form-radio'
import { FormSelect } from '@/components/forms/form-select'
import { FormTextarea } from '@/components/forms/form-textarea'
import { Button } from '@/components/ui/button'
import { ToggleButton } from '@/components/ui/toggle-button'

import { exampleSchema, type TExampleSchema } from '../schema'

export function FormExample() {
  const [disabled, setDisabled] = createSignal(false)

  const form = createForm({
    initialInput: {
      input: '',
      textarea: '',
      checkbox: false,
      select: '',
      select_multiple: [],
      radio: '',
    },
    schema: exampleSchema,
    validate: 'submit',
  })

  function onSubmit(values: TExampleSchema) {
    console.log(values)
  }

  const options = [
    { label: 'Option 1', value: 'option-1' },
    { label: 'Option 2', value: 'option-2' },
    { label: 'Option 3', value: 'option-3' },
    { label: 'Option 4', value: 'option-4' },
    { label: 'Option 5', value: 'option-5' },
  ]

  return (
    <Form of={form} onSubmit={onSubmit} class="grid grid-cols-1 gap-2 max-w-sm">
      <div class="text-4xl capitalize font-heading font-extrabold">Form Example</div>

      <ToggleButton
        variant="outline"
        size="sm"
        class="justify-self-end"
        pressed={disabled()}
        onChange={setDisabled}
      >
        Disable
      </ToggleButton>

      <Field of={form} path={['input']}>
        {(field) => (
          <FormInput
            {...field.props}
            label="Input"
            placeholder="Input..."
            onChange={field.onInput}
            errors={field.errors}
            disabled={disabled()}
          />
        )}
      </Field>

      <Field of={form} path={['textarea']}>
        {(field) => (
          <FormTextarea
            {...field.props}
            label="Textarea"
            placeholder="Textarea..."
            onChange={field.onInput}
            errors={field.errors}
            disabled={disabled()}
          />
        )}
      </Field>

      <Field of={form} path={['checkbox']}>
        {(field) => (
          <FormCheckbox
            {...field.props}
            label="Checkbox"
            description="Checkbox description"
            checked={field.input}
            onChange={field.onInput}
            errors={field.errors}
            disabled={disabled()}
          />
        )}
      </Field>

      <Field of={form} path={['select']}>
        {(field) => (
          <FormSelect
            {...field.props}
            multiple={false}
            label="Select"
            placeholder="Select..."
            options={options}
            value={options.find((o) => o.value === field.input) ?? null}
            onChange={(v) => field.onInput(v?.value ?? '')}
            errors={field.errors}
            disabled={disabled()}
          />
        )}
      </Field>

      <Field of={form} path={['select_multiple']}>
        {(field) => (
          <FormSelect
            {...field.props}
            label="Select multiple"
            placeholder="Select..."
            options={options}
            value={options.filter((o) => field.input.includes(o.value)) ?? []}
            onChange={(v) => field.onInput(v?.map((o) => o.value) ?? [])}
            errors={field.errors}
            disabled={disabled()}
            multiple
          />
        )}
      </Field>

      <Field of={form} path={['radio']}>
        {(field) => (
          <FormRadio
            {...field.props}
            orientation="vertical"
            label="Radio"
            options={options}
            value={options.find((o) => o.value === field.input) ?? null}
            onChange={field.onInput}
            errors={field.errors}
            disabled={disabled()}
          />
        )}
      </Field>

      <div class="flex justify-end gap-2">
        <Button type="button" onClick={() => reset(form)} disabled={disabled()}>
          Reset
        </Button>

        <Button type="submit" disabled={disabled()}>
          Submit
        </Button>
      </div>

      <pre class="overflow-x-auto bg-foreground text-background p-2 rounded-lg text-xs">
        {JSON.stringify(getInput(form), null, 2)}
      </pre>
      <pre class="overflow-x-auto bg-foreground text-background p-2 rounded-lg text-xs">
        {JSON.stringify(getAllErrors(form), null, 2)}
      </pre>
    </Form>
  )
}
