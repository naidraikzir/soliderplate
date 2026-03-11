import { createFileRoute } from '@tanstack/solid-router'

export const Route = createFileRoute('/_app/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div class="grid grid-cols-1 gap-2">
      <div class="text-4xl capitalize font-heading font-extrabold">
        vast cosmic arena totam rem aperiam
      </div>
      <p>
        Sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat
        voluptatem citizens of distant epochs courage of our questions vel illum qui dolorem eum
        fugiat quo voluptas nulla pariatur radio telescope circumnavigated? Sea of Tranquility
        shores of the cosmic ocean laws of physics vanquish the impossible inconspicuous motes of
        rock and gas Ut enim ad minima veniam.
      </p>
      <p>
        Dream of the mind's eye intelligent beings made in the interiors of collapsing stars totam
        rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae
        dicta sunt explicabo a very small stage in a vast cosmic arena totam rem aperiam, eaque ipsa
        quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
      </p>
    </div>
  )
}
