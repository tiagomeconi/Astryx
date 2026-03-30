import Link from 'next/link'
import { ChevronRight, Download } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import type { Order } from '@/types/database'
import { SERVICE_LABELS, STATUS_LABELS, STATUS_COLORS } from '@/constants/services'

interface Props {
  order: Order
}

function formatDate(iso: string) {
  return new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }).format(
    new Date(iso),
  )
}

function formatPrice(cents: number) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(cents / 100)
}

export function OrderCard({ order }: Props) {
  return (
    <Link href={`/pedidos/${order.id}`}>
      <div className="rounded-xl border border-[rgba(201,168,76,0.1)] bg-[rgba(255,255,255,0.02)] hover:border-[rgba(201,168,76,0.25)] hover:bg-[rgba(201,168,76,0.03)] transition-all duration-200 p-5 flex items-center gap-4 group">
        {/* Info principal */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 flex-wrap">
            <p className="font-medium text-[var(--color-soft-white)] truncate">
              {SERVICE_LABELS[order.service_type]}
            </p>
            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[order.status]}`}>
              {STATUS_LABELS[order.status]}
            </span>
          </div>
          <p className="text-sm text-[var(--color-soft-white-dim)]/60 mt-1">
            {order.birth_data?.full_name} · {formatDate(order.created_at)}
          </p>
        </div>

        {/* Preço + ações */}
        <div className="flex items-center gap-4 shrink-0">
          <p className="text-sm font-medium text-[var(--color-gold)] hidden sm:block">
            {formatPrice(order.price_cents)}
          </p>
          {order.status === 'delivered' && order.astral_chart && (
            <span className="flex items-center gap-1 text-xs text-emerald-400">
              <Download className="w-3.5 h-3.5" />
              PDF
            </span>
          )}
          <ChevronRight className="w-4 h-4 text-[var(--color-soft-white-dim)]/30 group-hover:text-[var(--color-gold)] transition-colors" />
        </div>
      </div>
    </Link>
  )
}
