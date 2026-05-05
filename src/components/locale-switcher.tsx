import { For } from 'solid-js'

import { cx } from '@/lib/cva'
import { m } from '@/paraglide/messages'
import { getLocale, locales, setLocale } from '@/paraglide/runtime'

import { Button } from './ui/button'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'

export function LocaleSwitcher(props: { class?: string }) {
  return (
    <Popover>
      <PopoverTrigger class={props.class}>
        <Button variant="ghost" size="icon-sm">
          {getLocale()}
        </Button>
      </PopoverTrigger>

      <PopoverContent class="w-auto p-1">
        <For each={locales}>
          {(locale) => (
            <Button
              variant="ghost"
              size="icon-sm"
              class={cx('block border', { 'opacity-50 border-0': locale !== getLocale() })}
              onClick={() => (confirm(m.change_locale()) ? setLocale(locale) : null)}
            >
              {locale}
            </Button>
          )}
        </For>
      </PopoverContent>
    </Popover>
  )
}
