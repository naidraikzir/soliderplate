import { delay } from 'es-toolkit'
import { createSignal, For } from 'solid-js'

import { cx } from '@/lib/cva'
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
                void (async () => {
                  await delay(1)
                  void setLocale(locale)
                })()
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
