import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles, Star, Moon, Sun } from 'lucide-react'
import { SERVICE_LABELS, SERVICE_DESCRIPTIONS, PRICE_TABLE } from '@/constants/services'
import type { ServiceType } from '@/types/database'

const FEATURED_SERVICES: { type: ServiceType; icon: React.ReactNode; highlight?: boolean }[] = [
  {
    type: 'basic',
    icon: <Star className="w-6 h-6" />,
  },
  {
    type: 'complete',
    icon: <Sparkles className="w-6 h-6" />,
    highlight: true,
  },
  {
    type: 'synastry',
    icon: <Moon className="w-6 h-6" />,
  },
  {
    type: 'solar_return',
    icon: <Sun className="w-6 h-6" />,
  },
]

function formatPrice(cents: number) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(cents / 100)
}

export function ServicesPreview() {
  return (
    <section className="relative z-10 py-24 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <p className="text-xs font-medium tracking-widest uppercase text-[var(--color-gold)]">
            Nossos Serviços
          </p>
          <h2 className="font-heading text-4xl md:text-5xl font-semibold text-[var(--color-soft-white)]">
            Escolha o mapa ideal para você
          </h2>
          <p className="text-[var(--color-soft-white-dim)] max-w-lg mx-auto">
            Cada mapa é elaborado individualmente, com interpretação aprofundada e linguagem acessível.
          </p>
        </div>

        {/* Grid de cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURED_SERVICES.map(({ type, icon, highlight }) => (
            <div
              key={type}
              className={`relative rounded-2xl p-6 flex flex-col gap-5 border transition-all duration-300 group hover:-translate-y-1 ${
                highlight
                  ? 'bg-[rgba(201,168,76,0.07)] border-[rgba(201,168,76,0.4)] gold-glow'
                  : 'bg-[rgba(255,255,255,0.03)] border-[rgba(201,168,76,0.12)] hover:border-[rgba(201,168,76,0.3)]'
              }`}
            >
              {/* Badge mais popular */}
              {highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[var(--color-gold)] text-[#0e0120] text-xs font-semibold whitespace-nowrap">
                  Mais Completo
                </div>
              )}

              {/* Ícone */}
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  highlight
                    ? 'bg-[rgba(201,168,76,0.2)] text-[var(--color-gold)]'
                    : 'bg-[rgba(255,255,255,0.05)] text-[var(--color-soft-white-dim)] group-hover:bg-[rgba(201,168,76,0.1)] group-hover:text-[var(--color-gold)]'
                } transition-colors duration-300`}
              >
                {icon}
              </div>

              {/* Texto */}
              <div className="flex-1 space-y-2">
                <h3 className="font-heading text-xl font-semibold text-[var(--color-soft-white)]">
                  {SERVICE_LABELS[type]}
                </h3>
                <p className="text-sm text-[var(--color-soft-white-dim)] leading-relaxed">
                  {SERVICE_DESCRIPTIONS[type]}
                </p>
              </div>

              {/* Preço */}
              <div className="pt-2 border-t border-[rgba(201,168,76,0.1)]">
                <p className="text-2xl font-heading font-semibold text-[var(--color-gold)]">
                  {formatPrice(PRICE_TABLE[type])}
                </p>
                <p className="text-xs text-[var(--color-soft-white-dim)]/60 mt-0.5">pagamento único</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link href="/servicos">
            <Button
              variant="ghost"
              className="text-[var(--color-gold)] hover:text-[var(--color-gold-light)] hover:bg-[rgba(201,168,76,0.05)] gap-2"
            >
              Ver todos os detalhes
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
