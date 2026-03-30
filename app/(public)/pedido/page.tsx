import type { Metadata } from 'next'
import { StarfieldCanvas } from '@/components/StarfieldCanvas'
import { OrderFormWizard } from '@/components/organisms/pedido/OrderFormWizard'

export const metadata: Metadata = { title: 'Solicitar Mapa Astral' }

export default function PedidoPage() {
  return (
    <>
      <StarfieldCanvas />
      <div className="relative min-h-screen pt-24 pb-16 px-4">
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            background:
              'radial-gradient(ellipse 70% 50% at 50% 20%, rgba(79,70,229,0.12) 0%, transparent 70%)',
          }}
        />

        <div className="relative z-10 container mx-auto max-w-2xl">
          <div className="text-center mb-10 space-y-3">
            <p className="text-xs font-medium tracking-widest uppercase text-[var(--color-gold)]">
              Novo Pedido
            </p>
            <h1 className="font-heading text-4xl sm:text-5xl font-semibold text-[var(--color-soft-white)]">
              Solicite seu mapa astral
            </h1>
            <p className="text-[var(--color-soft-white-dim)] max-w-md mx-auto">
              Preencha os dados abaixo e nossa astróloga iniciará a elaboração do seu mapa.
            </p>
          </div>

          <OrderFormWizard />
        </div>
      </div>
    </>
  )
}
