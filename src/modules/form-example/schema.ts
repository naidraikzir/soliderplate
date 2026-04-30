import {
  array,
  boolean,
  check,
  isoTimestamp,
  literal,
  minLength,
  nonEmpty,
  object,
  pipe,
  string,
  type InferOutput,
} from 'valibot'

export const ExampleSchema = object({
  input: pipe(string(), nonEmpty(), minLength(3)),
  textarea: pipe(string(), nonEmpty(), minLength(3)),
  checkbox: pipe(boolean(), literal(true, 'Checkbox must be checked')),
  select: pipe(string(), nonEmpty()),
  select_multiple: pipe(array(string()), nonEmpty()),
  checkbox_group: pipe(array(string()), nonEmpty()),
  radio: pipe(string(), nonEmpty()),
  date: pipe(string(), isoTimestamp()),
  date_range: pipe(
    object({
      from: pipe(string(), isoTimestamp()),
      to: pipe(string(), isoTimestamp()),
    }),
    check((value) => !!(value.from && value.to), 'Required'),
  ),
  dropzone: pipe(string(), nonEmpty()),
  dropzone_multi: pipe(array(string()), nonEmpty()),
})

export type ExampleSchema = InferOutput<typeof ExampleSchema>
