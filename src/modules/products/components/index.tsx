import { useLiveQuery } from '@tanstack/solid-db'
import { For } from 'solid-js'

import { productCollection } from '../collection'

export function ProductList() {
  const products = useLiveQuery((q) => q.from({ products: productCollection }))

  return (
    <div class="grid grid-cols-1 gap-4 max-w-xl mx-auto">
      <div class="text-4xl capitalize font-heading font-extrabold">Products</div>

      <For each={products()}>
        {(product) => (
          <div class="flex flex-col gap-2">
            <div class="flex items-center justify-between gap-2">
              <div class="text-lg">{product.title}</div>
              <div class="text-2xl">{product.price}</div>
            </div>
            <div class="flex gap-2">
              <img src={product.thumbnail} alt={product.title} class="max-w-24 max-h-24" />
              <div class="text-sm text-muted-foreground">{product.description}</div>
            </div>
          </div>
        )}
      </For>
    </div>
  )
}
