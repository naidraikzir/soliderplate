import { useInfiniteQuery } from '@tanstack/solid-query'
import { createWindowVirtualizer } from '@tanstack/solid-virtual'
import { For, createEffect } from 'solid-js'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useMediaQuery } from '@/hooks/use-media-query'
import { http } from '@/http'
import { type TPaginated } from '@/types'

import { type TProduct } from '../schema'

const PAGE_SIZE = 20

export function ProductList() {
  const query = useInfiniteQuery(() => ({
    queryKey: ['products'],
    queryFn: ({ pageParam }) =>
      http('/products', { searchParams: { skip: pageParam, limit: PAGE_SIZE } }).json<
        TPaginated<'products', TProduct>
      >(),
    initialPageParam: 0,
    getNextPageParam: (last, _pages, lastPageParam) => {
      const next = lastPageParam + PAGE_SIZE
      return next < last.total ? next : undefined
    },
  }))

  const products = () => query.data?.pages.flatMap((page) => page.products) ?? []
  const isLg = useMediaQuery('(min-width: 1024px)')
  const cols = () => (isLg() ? 3 : 2)
  const rows = () => Math.ceil(products().length / cols())

  let listEl: HTMLDivElement | undefined

  const virtualizer = createWindowVirtualizer({
    get count() {
      return rows()
    },
    estimateSize: () => 240,
    overscan: 4,
    get scrollMargin() {
      return listEl?.offsetTop ?? 0
    },
  })

  // sentinel: fetch next page when the last row becomes visible
  createEffect(() => {
    const items = virtualizer.getVirtualItems()
    const last = items.at(-1)
    if (last && last.index >= rows() - 1 && query.hasNextPage && !query.isFetchingNextPage) {
      void query.fetchNextPage()
    }
  })

  return (
    <div class="max-w-7xl mx-auto">
      <div class="text-4xl capitalize font-heading font-extrabold">Products</div>

      <div class="mt-4" ref={(el) => (listEl = el)}>
        <div class="relative w-full" style={{ height: `${virtualizer.getTotalSize()}px` }}>
          <For each={virtualizer.getVirtualItems()}>
            {(virtualRow) => {
              const start = virtualRow.index * cols()
              return (
                <div
                  ref={(el) => {
                    // ref runs before dynamic attrs; virtualizer needs data-index to resolve the row
                    el.dataset.index = String(virtualRow.index)
                    virtualizer.measureElement(el)
                  }}
                  data-index={virtualRow.index}
                  class="absolute left-0 top-0 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-4"
                  style={{
                    transform: `translateY(${virtualRow.start - virtualizer.options.scrollMargin}px)`,
                  }}
                >
                  <For each={products().slice(start, start + cols())}>
                    {(product) => (
                      <Card class="gap-4 sm:gap-6 py-4 sm:py-6 bg-card/50 border-foreground/5 backdrop-blur-lg">
                        <CardHeader class="px-4 sm:px-6">
                          <CardTitle class="flex justify-between gap-2">
                            <div class="text-lg">{product.title}</div>
                            <div class="text-2xl font-mono">${product.price}</div>
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
            }}
          </For>
        </div>
      </div>

      {query.isFetchingNextPage && (
        <div class="py-4 text-center text-sm text-muted-foreground">Loading more…</div>
      )}
    </div>
  )
}
