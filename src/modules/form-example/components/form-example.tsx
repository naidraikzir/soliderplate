import { createForm, Field, Form, getInput, getAllErrors, reset } from '@formisch/solid'
import dayjs from 'dayjs'
import { createSignal } from 'solid-js'

import {
  FormCheckbox,
  FormCheckboxGroup,
  FormDatePicker,
  FormInput,
  FormRadio,
  FormSelect,
  FormTextarea,
} from '@/components/forms'
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
      checkbox_group: [],
      radio: '',
      date: '',
      date_range: {
        from: '',
        to: '',
      },
    },
    schema: exampleSchema,
    validate: 'submit',
  })

  function onSubmit(_values: TExampleSchema) {}

  const options = Array.from({ length: 4 }, (_, i) => ({
    label: `Option ${i + 1}`,
    value: `option-${i + 1}`,
  }))

  return (
    <Form of={form} onSubmit={onSubmit} class="grid grid-cols-1 md:grid-cols-2 gap-2 max-w-md">
      <div class="text-4xl capitalize font-heading font-extrabold md:col-span-2">Form Example</div>

      <FormInput
        of={form}
        path={['input']}
        label="Input"
        placeholder="Input..."
        disabled={disabled()}
      />

      <FormCheckbox
        of={form}
        path={['checkbox']}
        class="md:col-span-2"
        label="Checkbox"
        description="Checkbox Description"
        disabled={disabled()}
      />

      <FormTextarea
        of={form}
        path={['textarea']}
        class="md:col-span-2"
        label="Textarea"
        placeholder="Textarea..."
        disabled={disabled()}
      />

      <FormSelect
        of={form}
        path={['select']}
        label="Select"
        placeholder="Select..."
        options={options}
        disabled={disabled()}
      />

      <FormSelect
        of={form}
        path={['select_multiple']}
        label="Select multiple"
        placeholder="Select..."
        options={options}
        disabled={disabled()}
        multiple
      />

      <FormCheckboxGroup
        of={form}
        path={['checkbox_group']}
        label="Checkbox Group"
        options={options}
        disabled={disabled()}
      />

      <FormRadio
        of={form}
        path={['radio']}
        orientation="vertical"
        label="Radio"
        options={options}
        disabled={disabled()}
      />

      <Field of={form} path={['date']}>
        {(field) => (
          <FormDatePicker
            {...field.props}
            label="Date Picker"
            value={field.input ? dayjs(field.input).toDate() : null}
            onChange={(v) => field.onInput(dayjs(v).format())}
            errors={field.errors}
            disabled={disabled()}
          />
        )}
      </Field>

      <Field of={form} path={['date_range']}>
        {(field) => (
          <FormDatePicker
            {...field.props}
            label="Date Range Picker Object"
            value={[
              field.input.from ? dayjs(field.input.from).toDate() : null,
              field.input.to ? dayjs(field.input.to).toDate() : null,
            ]}
            onChange={(v) =>
              field.onInput({ from: dayjs(v[0]).format(), to: dayjs(v[1]).format() })
            }
            errors={field.errors}
            disabled={disabled()}
            range
          />
        )}
      </Field>

      <div class="md:col-span-2 flex justify-end gap-2">
        <ToggleButton variant="outline" size="sm" pressed={disabled()} onChange={setDisabled}>
          Disable
        </ToggleButton>

        <Button type="button" size="sm" onClick={() => reset(form)} disabled={disabled()}>
          Reset
        </Button>

        <Button type="submit" size="sm" disabled={disabled()}>
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
