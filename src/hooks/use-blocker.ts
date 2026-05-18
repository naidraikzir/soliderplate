import { useBlocker as useRouterBlocker } from '@tanstack/solid-router'
import { capitalize } from 'es-toolkit'

import { m } from '@/paraglide/messages'

export function useBlocker(shouldBlock: () => boolean) {
  useRouterBlocker({
    enableBeforeUnload: () => shouldBlock(),
    shouldBlockFn: () =>
      shouldBlock() && !confirm(m.block_navigation().split('? ').map(capitalize).join('? ')),
  })
}
