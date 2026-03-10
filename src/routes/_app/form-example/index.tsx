import { createFileRoute } from '@tanstack/solid-router'

import { ExampleForm } from '@/modules/example/components/example-form'

export const Route = createFileRoute('/_app/form-example/')({
  component: ExampleForm,
})
