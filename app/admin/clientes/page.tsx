import type { Metadata } from 'next'
import { createOrderService } from '@/lib/container'
import { User } from 'lucide-react'

export const metadata: Metadata = { title: 'Admin — Clientes' }

function formatDate(iso: string) {
  return new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short' }).format(new Date(iso))
}

export default async function AdminClientesPage() {
  const orderService = createOrderService()
  const allOrders = await orderService.getAllOrders()

  // Agrega clientes únicos a partir dos pedidos
  const clientMap = new Map<string, { name: string; orders: number; lastOrder: string }>()
  for (const order of allOrders) {
    const existing = clientMap.get(order.user_id)
    if (!existing) {
      clientMap.set(order.user_id, {
        name: order.birth_data?.full_name ?? 'Cliente',
        orders: 1,
        lastOrder: order.created_at,
      })
    } else {
      existing.orders++
      if (order.created_at > existing.lastOrder) {
        existing.lastOrder = order.created_at
      }
    }
  }

  const clients = Array.from(clientMap.entries()).map(([id, data]) => ({ id, ...data }))

  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <p className="text-xs text-[var(--color-gold)] font-medium tracking-widest uppercase">Gerenciar</p>
        <h1 className="font-heading text-4xl font-semibold text-[var(--color-soft-white)]">Clientes</h1>
        <p className="text-[var(--color-soft-white-dim)]">{clients.length} cliente{clients.length !== 1 ? 's' : ''} cadastrado{clients.length !== 1 ? 's' : ''}</p>
      </div>

      {clients.length === 0 ? (
        <div className="rounded-xl border border-[rgba(201,168,76,0.1)] bg-[rgba(255,255,255,0.02)] p-16 text-center">
          <p className="text-[var(--color-soft-white-dim)]">Nenhum cliente ainda.</p>
        </div>
      ) : (
        <div className="rounded-xl border border-[rgba(201,168,76,0.1)] bg-[rgba(255,255,255,0.02)] overflow-hidden">
          {/* Header */}
          <div className="hidden md:grid grid-cols-[1fr_auto_auto] gap-4 px-5 py-3 border-b border-[rgba(201,168,76,0.08)]">
            {['Cliente', 'Pedidos', 'Último pedido'].map((h) => (
              <p key={h} className="text-xs font-medium text-[var(--color-soft-white-dim)]/50 uppercase tracking-widest">{h}</p>
            ))}
          </div>

          {clients.map((client, i) => (
            <div
              key={client.id}
              className={`flex md:grid md:grid-cols-[1fr_auto_auto] gap-4 items-center px-5 py-4 ${i !== 0 ? 'border-t border-[rgba(201,168,76,0.06)]' : ''}`}
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="w-8 h-8 rounded-full bg-[rgba(201,168,76,0.12)] border border-[rgba(201,168,76,0.2)] flex items-center justify-center text-xs font-semibold text-[var(--color-gold)] shrink-0">
                  {client.name.charAt(0).toUpperCase()}
                </div>
                <p className="text-sm font-medium text-[var(--color-soft-white)] truncate">{client.name}</p>
              </div>
              <p className="text-sm text-[var(--color-soft-white-dim)] whitespace-nowrap">
                {client.orders} pedido{client.orders !== 1 ? 's' : ''}
              </p>
              <p className="text-xs text-[var(--color-soft-white-dim)]/60 whitespace-nowrap">
                {formatDate(client.lastOrder)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
