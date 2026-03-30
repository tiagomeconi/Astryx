import type { Metadata } from 'next'
import { auth } from '@/lib/auth'
import { createOrderService } from '@/lib/container'
import { OrderCard } from '@/components/molecules/OrderCard'
import { ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export const metadata: Metadata = { title: 'Meus Pedidos' }

export default async function PedidosPage() {
  const session = await auth()
  const orderService = createOrderService()
  const orders = await orderService.getUserOrders(session!.user.id)

  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <p className="text-sm text-[var(--color-gold)] font-medium tracking-widest uppercase">
          Histórico
        </p>
        <h1 className="font-heading text-4xl font-semibold text-[var(--color-soft-white)]">
          Meus Pedidos
        </h1>
        <p className="text-[var(--color-soft-white-dim)]">
          {orders.length} {orders.length === 1 ? 'pedido' : 'pedidos'} no total
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="rounded-2xl border border-[rgba(201,168,76,0.1)] bg-[rgba(255,255,255,0.02)] p-16 flex flex-col items-center gap-4 text-center">
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
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  )
}
