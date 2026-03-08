import xior from 'xior'

export const api = xior.create({
  baseURL: import.meta.env.VITE_API_URL,
})
