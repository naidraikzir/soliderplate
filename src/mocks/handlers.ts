import { http, HttpResponse, delay } from 'msw'

import type { TProduct } from '@/modules/products/schema'
import type { TPaginated } from '@/types'

const products: TProduct[] = Array.from({ length: 25 }, (_, i) => ({
  id: i + 1,
  title: `Product ${i + 1}`,
  description: `Description for product ${i + 1}`,
  price: (i + 1) * 9.99,
  thumbnail: `https://picsum.photos/seed/product-${i + 1}/200`,
}))

export const handlers = [
  http.get('*/products', async ({ request }) => {
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

  http.post('*/auth/login', async ({ request }) => {
    const { username, password } = (await request.json()) as { username: string; password: string }

    await delay(300)
    if (username !== 'demo' || password !== 'password') {
      return HttpResponse.json({ message: 'Invalid credentials' }, { status: 401 })
    }

    return HttpResponse.json({ accessToken: 'fake-access-token' })
  }),
]
