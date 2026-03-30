import Link from 'next/link'
import { Star } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t border-[rgba(201,168,76,0.15)] bg-[#0a0118] py-10">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Marca */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Star className="w-4 h-4" style={{ color: 'var(--color-gold)' }} fill="currentColor" />
              <span className="text-xl font-heading font-semibold text-[var(--color-soft-white)]">Astryx</span>
            </div>
            <p className="text-sm text-[var(--color-soft-white-dim)] leading-relaxed">
              Mapas astrais elaborados com profundidade, cuidado e precisão astrológica.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold text-[var(--color-gold)] mb-3 uppercase tracking-widest">
              Navegação
            </h4>
            <ul className="space-y-2">
              {[
                { href: '/servicos', label: 'Serviços' },
                { href: '/sobre', label: 'Sobre' },
                { href: '/faq', label: 'FAQ' },
                { href: '/pedido', label: 'Solicitar Mapa' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--color-soft-white-dim)] hover:text-[var(--color-gold)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Conta */}
          <div>
            <h4 className="text-sm font-semibold text-[var(--color-gold)] mb-3 uppercase tracking-widest">
              Sua Conta
            </h4>
            <ul className="space-y-2">
              {[
                { href: '/login', label: 'Entrar' },
                { href: '/cadastro', label: 'Criar conta' },
                { href: '/dashboard', label: 'Meus pedidos' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--color-soft-white-dim)] hover:text-[var(--color-gold)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-[rgba(201,168,76,0.1)] text-center">
          <p className="text-xs text-[var(--color-soft-white-dim)]/50">
            &copy; {new Date().getFullYear()} Astryx. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
