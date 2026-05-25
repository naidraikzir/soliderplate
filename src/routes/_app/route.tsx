import { createFileRoute, Link, Outlet, redirect } from '@tanstack/solid-router'
import { createSignal, For } from 'solid-js'

import bgDark from '@/assets/bg-dark.webp'
import bgLight from '@/assets/bg-light.webp'
import { LocaleSwitcher } from '@/components/locale-switcher'
import { ThemeSwitcher } from '@/components/theme-switcher'
import { Button } from '@/components/ui/button'
import { cx } from '@/lib/cva'
import { logout } from '@/modules/auth/services'

export const Route = createFileRoute('/_app')({
  component: RouteComponent,
  beforeLoad({ context, location: { pathname } }) {
    if (!context.isAuthenticated?.()) {
      throw redirect({
        to: '/login',
        search: { redirect: pathname.length > 1 ? pathname : undefined },
      })
    }
  },
})

function RouteComponent() {
  const navigate = Route.useNavigate()

  function onLogout() {
    logout()
    void navigate({ to: '/login' })
  }

  const [bg, toggleBg] = createSignal(false)

  return (
    <main class="grid grid-cols-1 gap-2 p-2">
      <div
        class={cx('fixed inset-0 opacity-0 transition bg-fixed bg-cover', { 'opacity-100': bg() })}
        style={{ 'background-image': `url(${bgLight})` }}
      />
      <div
        class={cx('fixed inset-0 opacity-0 transition bg-fixed bg-cover', {
          'dark:opacity-100': bg(),
        })}
        style={{ 'background-image': `url(${bgDark})` }}
      />
      <div class="fixed inset-0 bg-background/50" />

      <header class="relative flex items-center justify-between gap-4 z-2">
        <div class="flex gap-1 sm:gap-2">
          <For each={links}>
            {({ to, label }) => (
              <Link to={to} class="px-2">
                {label}
              </Link>
            )}
          </For>
        </div>

        <div class="flex items-center gap-1 sm:gap-2">
          <LocaleSwitcher />
          <Button variant="ghost" size="icon-sm" onClick={() => toggleBg((bg) => !bg)}>
            <span class="icon-[lucide--image]" />
          </Button>
          <ThemeSwitcher />
          <Button onClick={onLogout}>
            <span class="icon-[lucide--log-out] sm:hidden" />
            <span class="hidden sm:inline">Logout</span>
          </Button>
        </div>
      </header>

      <div class="w-2xl max-w-full mx-auto z-1">
        <Outlet />
      </div>
    </main>
  )
}

const links = [
  { to: '/', label: '/' },
  { to: '/form-example', label: 'Form' },
  { to: '/products', label: 'Products' },
]
