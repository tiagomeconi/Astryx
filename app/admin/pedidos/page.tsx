import type { Metadata } from 'next'
import Link from 'next/link'
import { createOrderService } from '@/lib/container'
import { STATUS_LABELS, STATUS_COLORS, SERVICE_LABELS } from '@/constants/services'
import type { OrderStatus } from '@/types/database'
import { ChevronRight } from 'lucide-react'

export const metadata: Metadata = { title: 'Admin — Pedidos' }

const STATUS_FILTERS: { label: string; value: string }[] = [
  { label: 'Todos', value: '' },
  { label: 'Aguardando', value: 'pending' },
  { label: 'Confirmado', value: 'confirmed' },
  { label: 'Em Produção', value: 'in_progress' },
  { label: 'Entregue', value: 'delivered' },
  { label: 'Cancelado', value: 'cancelled' },
]

function formatDate(iso: string) {
  return new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short', timeStyle: 'short' }).format(new Date(iso))
}

function formatPrice(cents: number) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(cents / 100)
}

interface Props {
  searchParams: Promise<{ status?: string }>
}

export default async function AdminPedidosPage({ searchParams }: Props) {
  const { status } = await searchParams
  const orderService = createOrderService()
  const orders = await orderService.getAllOrders(
    status ? { status: status as OrderStatus } : undefined,
  )

  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <p className="text-xs text-[var(--color-gold)] font-medium tracking-widest uppercase">Gerenciar</p>
        <h1 className="font-heading text-4xl font-semibold text-[var(--color-soft-white)]">Pedidos</h1>
        <p className="text-[var(--color-soft-white-dim)]">{orders.length} pedido{orders.length !== 1 ? 's' : ''} encontrado{orders.length !== 1 ? 's' : ''}</p>
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-2">
        {STATUS_FILTERS.map((f) => {
          const isActive = (status ?? '') === f.value
          return (
            <Link
              key={f.value}
              href={f.value ? `/admin/pedidos?status=${f.value}` : '/admin/pedidos'}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                isActive
                  ? 'bg-[var(--color-gold)] text-[#0e0120]'
                  : 'border border-[rgba(201,168,76,0.2)] text-[var(--color-soft-white-dim)] hover:border-[rgba(201,168,76,0.4)] hover:text-[var(--color-soft-white)]'
              }`}
            >
              {f.label}
            </Link>
          )
        })}
      </div>

      {/* Tabela */}
      {orders.length === 0 ? (
        <div className="rounded-xl border border-[rgba(201,168,76,0.1)] bg-[rgba(255,255,255,0.02)] p-16 text-center">
          <p className="text-[var(--color-soft-white-dim)]">Nenhum pedido encontrado.</p>
        </div>
      ) : (
        <div className="rounded-xl border border-[rgba(201,168,76,0.1)] bg-[rgba(255,255,255,0.02)] overflow-hidden">
          {/* Header */}
          <div className="hidden md:grid grid-cols-[1fr_1fr_auto_auto_auto_24px] gap-4 px-5 py-3 border-b border-[rgba(201,168,76,0.08)]">
            {['Cliente', 'Serviço', 'Data', 'Valor', 'Status'].map((h) => (
              <p key={h} className="text-xs font-medium text-[var(--color-soft-white-dim)]/50 uppercase tracking-widest">{h}</p>
            ))}
            <div />
          </div>

          {orders.map((order, i) => (
            <Link key={order.id} href={`/admin/pedidos/${order.id}`}>
              <div className={`flex md:grid md:grid-cols-[1fr_1fr_auto_auto_auto_24px] gap-4 items-center px-5 py-4 hover:bg-[rgba(201,168,76,0.04)] transition-colors group ${i !== 0 ? 'border-t border-[rgba(201,168,76,0.06)]' : ''}`}>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[var(--color-soft-white)] truncate">
                    {order.birth_data?.full_name ?? 'Sem nome'}
                  </p>
                  <p className="text-xs text-[var(--color-soft-white-dim)]/50 md:hidden">
                    {SERVICE_LABELS[order.service_type]}
                  </p>
                </div>
                <p className="text-sm text-[var(--color-soft-white-dim)] hidden md:block truncate">
                  {SERVICE_LABELS[order.service_type]}
                </p>
                <p className="text-xs text-[var(--color-soft-white-dim)]/60 hidden md:block whitespace-nowrap">
                  {formatDate(order.created_at)}
                </p>
                <p className="text-sm text-[var(--color-gold)] hidden md:block whitespace-nowrap">
                  {formatPrice(order.price_cents)}
                </p>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium whitespace-nowrap ${STATUS_COLORS[order.status]}`}>
                  {STATUS_LABELS[order.status]}
                </span>
                <ChevronRight className="w-4 h-4 text-[var(--color-soft-white-dim)]/30 group-hover:text-[var(--color-gold)] transition-colors shrink-0" />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
