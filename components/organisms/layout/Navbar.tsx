'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { useState } from 'react'
import { Menu, X, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { href: '/servicos', label: 'Serviços' },
  { href: '/sobre', label: 'Sobre' },
  { href: '/faq', label: 'FAQ' },
]

export function Navbar() {
  const { data: session } = useSession()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-[rgba(201,168,76,0.15)] bg-[#0e0120]/80 backdrop-blur-md">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <Star
              className="w-5 h-5 text-gold group-hover:rotate-12 transition-transform duration-300"
              style={{ color: 'var(--color-gold)' }}
              fill="currentColor"
            />
            <span
              className="text-2xl font-heading font-semibold tracking-wide"
              style={{ color: 'var(--color-soft-white)' }}
            >
              Astryx
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-[var(--color-soft-white-dim)] hover:text-[var(--color-gold)] transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            {session?.user ? (
              <>
                <Link href="/dashboard">
                  <Button variant="ghost" size="sm" className="text-[var(--color-soft-white-dim)] hover:text-[var(--color-gold)]">
                    Minha Área
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="text-[var(--color-soft-white-dim)] hover:text-red-400"
                >
                  Sair
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" size="sm" className="text-[var(--color-soft-white-dim)] hover:text-[var(--color-gold)]">
                    Entrar
                  </Button>
                </Link>
                <Link href="/pedido">
                  <Button
                    size="sm"
                    className="bg-[var(--color-gold)] text-[#0e0120] hover:bg-[var(--color-gold-light)] font-semibold"
                  >
                    Solicitar Mapa
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 text-[var(--color-soft-white)]"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-[rgba(201,168,76,0.15)] py-4 flex flex-col gap-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-sm font-medium text-[var(--color-soft-white-dim)] hover:text-[var(--color-gold)] py-1"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 border-t border-[rgba(201,168,76,0.1)] flex flex-col gap-2">
              {session?.user ? (
                <>
                  <Link href="/dashboard" onClick={() => setMobileOpen(false)}>
                    <Button variant="ghost" size="sm" className="w-full justify-start">Minha Área</Button>
                  </Link>
                  <Button variant="ghost" size="sm" onClick={() => signOut({ callbackUrl: '/' })} className="w-full justify-start text-red-400">
                    Sair
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/login" onClick={() => setMobileOpen(false)}>
                    <Button variant="ghost" size="sm" className="w-full justify-start">Entrar</Button>
                  </Link>
                  <Link href="/pedido" onClick={() => setMobileOpen(false)}>
                    <Button size="sm" className="w-full bg-[var(--color-gold)] text-[#0e0120] font-semibold">
                      Solicitar Mapa
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
