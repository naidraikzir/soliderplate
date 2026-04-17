import {
  array,
  boolean,
  check,
  isoTimestamp,
  minLength,
  object,
  pipe,
  string,
  type InferOutput,
} from 'valibot'

export const exampleSchema = object({
  input: pipe(string('Input is required'), minLength(3, 'Input must be at least 3 characters')),
  textarea: pipe(
    string('Textarea is required'),
    minLength(3, 'Textarea must be at least 3 characters'),
  ),
  checkbox: boolean(),
  select: pipe(string('Select is required'), minLength(1, 'Select is required')),
  select_multiple: pipe(
    array(string('Select multiple is required')),
    minLength(1, 'Select at least 1'),
  ),
  checkbox_group: pipe(
    array(string('Checkbox group is required')),
    minLength(1, 'Check at least 1'),
  ),
  radio: pipe(string('Radio is required'), minLength(1, 'Radio is required')),
  date: pipe(string(), isoTimestamp('Date is required')),
  date_range: pipe(
    object({
      from: pipe(string(), isoTimestamp('Date is required')),
      to: pipe(string(), isoTimestamp('Date is required')),
    }),
    check((value) => !!(value.from && value.to), 'Date range is required'),
  ),
  dropzone: pipe(string('Dropzone is required'), minLength(1, 'Dropzone is required')),
  dropzone_multi: pipe(
    array(string('Dropzone Multi is required')),
    minLength(1, 'Dropzone is required'),
  ),
})

export type TExampleSchema = InferOutput<typeof exampleSchema>
