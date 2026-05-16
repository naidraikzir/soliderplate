import { useColorMode } from '@kobalte/core'

import { Button } from './ui/button'

export function ThemeSwitcher() {
  const { toggleColorMode } = useColorMode()

  return (
    <Button variant="ghost" size="icon-sm" onClick={toggleColorMode}>
      <span class="[html[data-kb-theme=light]_&]:icon-[lucide--sun] [html[data-kb-theme=dark]_&]:icon-[lucide--moon]" />
    </Button>
  )
}
