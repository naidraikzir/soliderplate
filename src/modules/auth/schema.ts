import { minLength, pipe, string, object, type InferOutput } from 'valibot'

export const loginSchema = object({
  username: pipe(
    string('Username is required'),
    minLength(3, 'Username must be at least 3 characters'),
  ),
})

export type TLoginSchema = InferOutput<typeof loginSchema>
