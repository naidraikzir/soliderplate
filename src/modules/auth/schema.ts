import { minLength, pipe, string, object, type InferOutput } from 'valibot'

export const loginSchema = object({
  username: pipe(string('Username is required'), minLength(1, 'Username is required')),
  password: pipe(string('Password is required'), minLength(1, 'Password is required')),
})

export type TLoginSchema = InferOutput<typeof loginSchema>
