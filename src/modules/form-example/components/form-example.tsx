import { createForm, Field, Form, getInput, getAllErrors } from '@formisch/solid'
import { createSignal } from 'solid-js'

import { FormCheckbox } from '@/components/forms/form-checkbox'
import { FormInput } from '@/components/forms/form-input'
import { FormSelect } from '@/components/forms/form-select'
import { FormTextarea } from '@/components/forms/form-textarea'
import { Button } from '@/components/ui/button'

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
    <Form of={form} onSubmit={onSubmit} class="grid grid-cols-1 gap-2 max-w-xs p-2">
      <Button onClick={() => setDisabled((v) => !v)}>Disabled</Button>

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
            options={options}
            value={options.filter((o) => field.input.includes(o.value)) ?? []}
            onChange={(v) => field.onInput(v?.map((o) => o.value) ?? [])}
            errors={field.errors}
            disabled={disabled()}
            multiple
          />
        )}
      </Field>

      <Button type="submit">Submit</Button>

      <pre class="overflow-x-auto bg-foreground text-background p-2 rounded-lg">
        {JSON.stringify(getInput(form), null, 2)}
      </pre>
      <pre class="overflow-x-auto bg-foreground text-background p-2 rounded-lg">
        {JSON.stringify(getAllErrors(form), null, 2)}
      </pre>
    </Form>
  )
}
