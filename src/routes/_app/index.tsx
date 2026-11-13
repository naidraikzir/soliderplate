import { createFileRoute } from '@tanstack/solid-router'
import { For } from 'solid-js'

import { http } from '@/http'

export const Route = createFileRoute('/_app/')({
  loader: () => http('/').json<{ title: string; content: string }>(),
  component: RouteComponent,
})

function RouteComponent() {
  const home = Route.useLoaderData()

  return (
    <div class="max-w-4xl mx-auto grid grid-cols-1 gap-4">
      <div class="text-4xl capitalize font-heading font-extrabold">{home().title}</div>
      <article class="grid gap-2">
        <For each={home().content.split('\n')}>{(p) => <p>{p}</p>}</For>
      </article>
    </div>
  )
}
