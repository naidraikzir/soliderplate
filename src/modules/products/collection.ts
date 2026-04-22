import { queryCollectionOptions } from '@tanstack/query-db-collection'
import { createCollection } from '@tanstack/solid-db'

import { http } from '@/http'
import { queryClient } from '@/query-client'
import { type TPaginated } from '@/types'

import { type TProduct } from './schema'

export const productCollection = createCollection(
  queryCollectionOptions({
    queryClient,
    queryKey: ['products'],
    queryFn: async () => http('/products').json<TPaginated<'products', TProduct>>(),
    select: (data) => data.products,
    getKey: (item) => item.id,
  }),
)
