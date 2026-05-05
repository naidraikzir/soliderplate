import { m } from '@/paraglide/messages'
import { getLocale, setLocale } from '@/paraglide/runtime'

import { Button } from './ui/button'

export function LocaleSwitcher(props: { class?: string }) {
  return (
    <Button
      variant="ghost"
      class={props.class}
      onClick={() =>
        confirm(m.change_locale()) ? setLocale(getLocale() === 'en' ? 'id' : 'en') : null
      }
    >
      {getLocale()}
    </Button>
  )
}
