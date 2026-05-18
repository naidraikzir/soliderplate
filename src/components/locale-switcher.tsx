import { capitalize } from 'es-toolkit'
import { createSignal, For } from 'solid-js'

import { getIsBlocking, setBypassBlocker } from '@/hooks/use-blocker'
import { cx } from '@/lib/cva'
import { m } from '@/paraglide/messages'
import { getLocale, locales, setLocale } from '@/paraglide/runtime'

import { Button } from './ui/button'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'

export function LocaleSwitcher(props: { class?: string }) {
  const [isOpen, setIsOpen] = createSignal(false)

  return (
    <Popover open={isOpen()} onOpenChange={setIsOpen}>
      <PopoverTrigger class={props.class}>
        <Button variant="ghost" size="icon-sm">
          {getLocale()}
        </Button>
      </PopoverTrigger>

      <PopoverContent class="w-auto p-1 data-closed:animate-none!">
        <For each={locales}>
          {(locale) => (
            <Button
              variant="ghost"
              size="icon-sm"
              class={cx('block border', { 'opacity-50 border-0': locale !== getLocale() })}
              onClick={() => {
                setIsOpen(false)

                if (
                  getIsBlocking() &&
                  !confirm(m.block_navigation().split('? ').map(capitalize).join('? '))
                ) {
                  return
                }

                setBypassBlocker(true)
                void setLocale(locale)
              }}
            >
              {locale}
            </Button>
          )}
        </For>
      </PopoverContent>
    </Popover>
  )
}
