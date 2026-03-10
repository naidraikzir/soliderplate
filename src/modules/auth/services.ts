import type { TLoginSchema } from './schema'

export function login(_values: TLoginSchema) {
  const token = Math.random().toString(36).substring(2, 15)
  localStorage.setItem('token', token)
}

export function logout() {
  localStorage.removeItem('token')
}
