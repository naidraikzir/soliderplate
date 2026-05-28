import { useLiveQuery } from '@tanstack/solid-db'
import { For } from 'solid-js'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { productCollection } from '../collection'

export function ProductList() {
  const products = useLiveQuery((q) => q.from({ products: productCollection }))

  return (
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div class="sm:col-span-2 text-4xl capitalize font-heading font-extrabold">Products</div>

      <For each={products()}>
        {(product) => (
          <Card class="gap-4 sm:gap-6 py-4 sm:py-6 bg-card/50 border-foreground/5 backdrop-blur-lg">
            <CardHeader class="px-4 sm:px-6">
              <CardTitle class="flex justify-between gap-2">
                <div class="text-lg">{product.title}</div>
                <div class="text-2xl">{product.price}</div>
              </CardTitle>
            </CardHeader>
            <CardContent class="flex gap-2 px-4 sm:px-6">
              <img
                src={product.thumbnail}
                alt={product.title}
                class="min-h-24 h-24 aspect-square opacity-0 transition"
                onload={({ target }) => target.classList.remove('opacity-0')}
              />
              <div class="text-sm text-muted-foreground">{product.description}</div>
            </CardContent>
          </Card>
        )}
      </For>
    </div>
  )
}
