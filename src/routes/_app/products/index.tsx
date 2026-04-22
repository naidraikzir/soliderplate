import { createFileRoute } from '@tanstack/solid-router'

import { ProductList } from '@/modules/products/components'

export const Route = createFileRoute('/_app/products/')({
  component: ProductList,
})
