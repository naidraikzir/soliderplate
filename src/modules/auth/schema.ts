import { minLength, pipe, string, object } from 'valibot'

export const LoginSchema = object({
  username: pipe(
    string('Username is required'),
    minLength(3, 'Username must be at least 3 characters'),
  ),
})
