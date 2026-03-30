import type { Metadata } from 'next'
import { auth } from '@/lib/auth'
import { createOrderService } from '@/lib/container'
import { OrderCard } from '@/components/molecules/OrderCard'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ShoppingBag, Star } from 'lucide-react'

export const metadata: Metadata = { title: 'Minha Área' }

export default async function DashboardPage() {
  const session = await auth()
  const orderService = createOrderService()
  const orders = await orderService.getUserOrders(session!.user.id)
  const recent = orders.slice(0, 3)

  const firstName = session!.user.name?.split(' ')[0] ?? 'Bem-vinda'

  return (
    <div className="space-y-10">
      {/* Cabeçalho */}
      <div className="space-y-1">
        <p className="text-sm text-[var(--color-gold)] font-medium tracking-widest uppercase">
          Área do Cliente
        </p>
        <h1 className="font-heading text-4xl font-semibold text-[var(--color-soft-white)]">
          Olá, {firstName}
        </h1>
        <p className="text-[var(--color-soft-white-dim)]">
          Acompanhe seus pedidos e faça o download dos seus mapas.
        </p>
      </div>

      {/* CTA novo pedido */}
      <div className="rounded-2xl border border-[rgba(201,168,76,0.2)] bg-[rgba(201,168,76,0.04)] p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-[rgba(201,168,76,0.15)] flex items-center justify-center">
            <Star className="w-5 h-5 text-[var(--color-gold)]" fill="currentColor" />
          </div>
          <div>
            <p className="font-medium text-[var(--color-soft-white)]">Solicitar novo mapa</p>
            <p className="text-sm text-[var(--color-soft-white-dim)]/70">
              Mapa Completo, Sinastria, Revolução Solar e mais.
            </p>
          </div>
        </div>
        <Link href="/pedido">
          <Button className="bg-[var(--color-gold)] text-[#0e0120] hover:bg-[var(--color-gold-light)] font-semibold shrink-0">
            Solicitar Mapa
          </Button>
        </Link>
      </div>

      {/* Pedidos recentes */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-2xl font-semibold text-[var(--color-soft-white)]">
            Pedidos recentes
          </h2>
          {orders.length > 3 && (
            <Link href="/pedidos">
              <Button variant="ghost" size="sm" className="text-[var(--color-gold)] hover:text-[var(--color-gold-light)]">
                Ver todos
              </Button>
            </Link>
          )}
        </div>

        {recent.length === 0 ? (
          <div className="rounded-2xl border border-[rgba(201,168,76,0.1)] bg-[rgba(255,255,255,0.02)] p-12 flex flex-col items-center gap-4 text-center">
            <ShoppingBag className="w-10 h-10 text-[var(--color-soft-white-dim)]/30" />
            <div>
              <p className="font-medium text-[var(--color-soft-white-dim)]">Nenhum pedido ainda</p>
              <p className="text-sm text-[var(--color-soft-white-dim)]/60">
                Solicite seu primeiro mapa astral.
              </p>
            </div>
            <Link href="/pedido">
              <Button className="bg-[var(--color-gold)] text-[#0e0120] hover:bg-[var(--color-gold-light)] font-semibold">
                Solicitar Mapa
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {recent.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
