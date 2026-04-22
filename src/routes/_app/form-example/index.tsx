import { createFileRoute } from '@tanstack/solid-router'

import { FormExample } from '@/modules/form-example/components'

export const Route = createFileRoute('/_app/form-example/')({
  component: FormExample,
})
