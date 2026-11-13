import { faker } from '@faker-js/faker'
import { http, HttpResponse, delay } from 'msw'

import type { TProduct } from '@/modules/products/schema'
import type { TPaginated } from '@/types'

const API = import.meta.env.VITE_API_URL

const products: TProduct[] = Array.from({ length: 500 }, (_, i) => ({
  id: i + 1,
  title: faker.commerce.productName(),
  description: faker.commerce.productDescription(),
  price: Number.parseFloat(faker.commerce.price({ max: 500 })),
  thumbnail: `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="hsl(${i * 37},60%,70%)"/><stop offset="1" stop-color="hsl(${i * 37},60%,45%)"/></linearGradient></defs><rect width="200" height="200" fill="url(#g)"/><text x="50%" y="50%" text-anchor="middle" dy=".35em" font-family="sans-serif" font-size="40" fill="white">${i + 1}</text></svg>`,
  )}`,
}))

export const handlers = [
  http.get(`${API}/`, async () => {
    await delay(300)
    return HttpResponse.json({
      title: faker.lorem.words(5),
      content: faker.lorem.paragraphs(10),
    })
  }),

  http.get(`${API}/products`, async ({ request }) => {
    const url = new URL(request.url)
    const limit = Number(url.searchParams.get('limit') ?? products.length)
    const skip = Number(url.searchParams.get('skip') ?? 0)

    await delay(300)
    return HttpResponse.json<TPaginated<'products', TProduct>>({
      products: products.slice(skip, skip + limit),
      total: products.length,
      skip,
      limit,
    })
  }),

  http.post(`${API}/auth/login`, async ({ request }) => {
    const { username, password } = (await request.json()) as { username: string; password: string }

    await delay(300)
    if (username !== 'demo' || password !== 'password') {
      return HttpResponse.json({ message: 'Invalid credentials' }, { status: 401 })
    }

    return HttpResponse.json({ accessToken: 'fake-access-token' })
  }),
]
