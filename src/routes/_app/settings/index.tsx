import { createFileRoute } from '@tanstack/solid-router'

export const Route = createFileRoute('/_app/settings/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div class="text-4xl capitalize font-heading font-semibold">Settings</div>
}
