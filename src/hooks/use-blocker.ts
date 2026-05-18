import { useBlocker as useRouterBlocker } from '@tanstack/solid-router'
import { capitalize } from 'es-toolkit'
import { createEffect, createSignal, onCleanup } from 'solid-js'

import { m } from '@/paraglide/messages'

export const [getIsBlocking, setIsBlocking] = createSignal(false)
export const [bypassBlocker, setBypassBlocker] = createSignal(false)

export function useBlocker(shouldBlock: () => boolean) {
  createEffect(() => {
    setIsBlocking(shouldBlock())
    onCleanup(() => {
      setIsBlocking(false)
      setBypassBlocker(false)
    })
  })

  useRouterBlocker({
    enableBeforeUnload: () => shouldBlock() && !bypassBlocker(),
    shouldBlockFn: () =>
      shouldBlock() && !confirm(m.block_navigation().split('? ').map(capitalize).join('? ')),
  })
}
