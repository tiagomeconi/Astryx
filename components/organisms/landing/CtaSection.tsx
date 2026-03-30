import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Star } from 'lucide-react'

export function CtaSection() {
  return (
    <section className="relative z-10 py-24 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="relative rounded-3xl overflow-hidden border border-[rgba(201,168,76,0.25)] p-12 md:p-16 text-center">
          {/* Fundo gradiente */}
          <div
            className="absolute inset-0 pointer-events-none"
            aria-hidden="true"
            style={{
              background:
                'radial-gradient(ellipse 100% 100% at 50% 50%, rgba(79,70,229,0.15) 0%, rgba(26,5,51,0.95) 60%, rgba(14,1,32,1) 100%)',
            }}
          />

          {/* Estrelas decorativas */}
          <Star
            className="absolute top-6 left-10 w-4 h-4 text-[var(--color-gold)] opacity-40"
            fill="currentColor"
            aria-hidden="true"
          />
          <Star
            className="absolute top-10 right-16 w-3 h-3 text-[var(--color-gold)] opacity-30"
            fill="currentColor"
            aria-hidden="true"
          />
          <Star
            className="absolute bottom-8 left-20 w-3 h-3 text-[var(--color-gold)] opacity-25"
            fill="currentColor"
            aria-hidden="true"
          />

          {/* Conteúdo */}
          <div className="relative z-10 space-y-7">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[rgba(201,168,76,0.3)] bg-[rgba(201,168,76,0.06)] text-xs font-medium tracking-widest uppercase text-[var(--color-gold)]">
              Comece Agora
            </div>

            <h2 className="font-heading text-4xl md:text-5xl font-semibold text-[var(--color-soft-white)] leading-tight">
              Seu mapa astral espera por você
            </h2>

            <p className="text-[var(--color-soft-white-dim)] text-lg max-w-lg mx-auto leading-relaxed">
              Dê o primeiro passo no seu autoconhecimento. Uma leitura profunda,
              feita exclusivamente para você.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link href="/pedido">
                <Button
                  size="lg"
                  className="px-10 py-6 text-base font-semibold bg-[var(--color-gold)] text-[#0e0120] hover:bg-[var(--color-gold-light)] shadow-lg shadow-[rgba(201,168,76,0.3)] transition-all duration-300 hover:shadow-xl hover:shadow-[rgba(201,168,76,0.45)]"
                >
                  Solicitar Meu Mapa Astral
                </Button>
              </Link>
              <Link href="/servicos">
                <Button
                  size="lg"
                  variant="ghost"
                  className="px-8 py-6 text-base text-[var(--color-soft-white-dim)] hover:text-[var(--color-soft-white)] border border-[rgba(201,168,76,0.2)] hover:border-[rgba(201,168,76,0.4)] hover:bg-[rgba(201,168,76,0.05)]"
                >
                  Ver Serviços
                </Button>
              </Link>
            </div>

            <p className="text-xs text-[var(--color-soft-white-dim)]/50">
              Entrega em até 5 dias úteis · PDF personalizado · Suporte via mensagem
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
