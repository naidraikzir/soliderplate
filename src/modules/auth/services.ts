import type { TLoginSchema } from './schema'

// call api that the response contains:
//   the refresh token in httpOnly cookie header
//   and access token in the response body
// status: 200
//   set is_authenticated to true
//   set access token as global variable
// status: 401
//   remove is_authenticated
export function login(_values: TLoginSchema) {
  localStorage.setItem('is_authenticated', 'true')
}

export function logout() {
  localStorage.removeItem('is_authenticated')
}
