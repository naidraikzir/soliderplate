export function login() {
  const token = Math.random().toString(36).substring(2, 15)
  localStorage.setItem('token', token)
}

export function logout() {
  localStorage.removeItem('token')
}
