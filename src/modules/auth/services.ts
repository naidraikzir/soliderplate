export function login(_values: { username: string }) {
  const token = Math.random().toString(36).substring(2, 15)
  localStorage.setItem('token', token)
}

export function logout() {
  localStorage.removeItem('token')
}
