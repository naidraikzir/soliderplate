import { pipe, string, object, type InferOutput, nonEmpty } from 'valibot'

export const loginSchema = object({
  username: pipe(string(), nonEmpty()),
  password: pipe(string(), nonEmpty()),
})

export type TLoginSchema = InferOutput<typeof loginSchema>
