'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { LayoutDashboard, ShoppingBag, Users, LogOut, Star } from 'lucide-react'
import { cn } from '@/lib/utils'

const ADMIN_LINKS = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/pedidos', label: 'Pedidos', icon: ShoppingBag },
  { href: '/admin/clientes', label: 'Clientes', icon: Users },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-60 min-h-screen border-r border-[rgba(201,168,76,0.15)] bg-[var(--color-deep-purple)] flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-[rgba(201,168,76,0.15)]">
        <Link href="/admin" className="flex items-center gap-2">
          <Star className="w-4 h-4" style={{ color: 'var(--color-gold)' }} fill="currentColor" />
          <span className="text-lg font-heading font-semibold text-[var(--color-soft-white)]">Astryx</span>
        </Link>
        <p className="text-xs text-[var(--color-soft-white-dim)]/60 mt-1 ml-6">Painel Admin</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1">
        {ADMIN_LINKS.map(({ href, label, icon: Icon }) => {
          const isActive = href === '/admin' ? pathname === '/admin' : pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                isActive
                  ? 'bg-[rgba(201,168,76,0.15)] text-[var(--color-gold)]'
                  : 'text-[var(--color-soft-white-dim)] hover:bg-[rgba(201,168,76,0.08)] hover:text-[var(--color-soft-white)]',
              )}
            >
              <Icon className="w-4 h-4" />
              {label}
            </Link>
          )
        })}
      </nav>

      {/* Sair */}
      <div className="p-4 border-t border-[rgba(201,168,76,0.15)]">
        <button
          onClick={() => signOut({ callbackUrl: '/' })}
          className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-[var(--color-soft-white-dim)] hover:text-red-400 hover:bg-red-400/10 transition-colors w-full"
        >
          <LogOut className="w-4 h-4" />
          Sair
        </button>
      </div>
    </aside>
  )
}
