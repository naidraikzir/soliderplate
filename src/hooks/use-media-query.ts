import { createSignal, onCleanup } from 'solid-js'
import { isServer } from 'solid-js/web'

export const useMediaQuery = (query: string) => {
  if (isServer) {
    return () => false
  }

  const mql = window.matchMedia(query)
  const [state, setState] = createSignal(mql.matches)
  const update = () => setState(mql.matches)
  mql.addEventListener('change', update)
  onCleanup(() => {
    mql.removeEventListener('change', update)
  })
  return state
}
