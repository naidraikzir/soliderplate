import ky from 'ky'

export const http = ky.create({
  baseUrl: import.meta.env.VITE_API_URL,
  credentials: 'include',
})
