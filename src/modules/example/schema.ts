import { array, boolean, minLength, object, pipe, string, type InferOutput } from 'valibot'

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
})

export type TExampleSchema = InferOutput<typeof exampleSchema>
