import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { auth } from '@/lib/auth'
import { createOrderService } from '@/lib/container'
import { SERVICE_LABELS, STATUS_LABELS, STATUS_COLORS, PRICE_TABLE } from '@/constants/services'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { AdminOrderActions } from '@/components/organisms/dashboard/AdminOrderActions'

export const metadata: Metadata = { title: 'Admin — Detalhe do Pedido' }

function formatDate(iso: string) {
  return new Intl.DateTimeFormat('pt-BR', { dateStyle: 'long', timeStyle: 'short' }).format(new Date(iso))
}

function formatPrice(cents: number) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(cents / 100)
}

function InfoRow({ label, value }: { label: string; value?: string | null }) {
  if (!value) return null
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-1">
      <span className="text-xs text-[var(--color-soft-white-dim)]/50 sm:w-36 shrink-0">{label}</span>
      <span className="text-sm text-[var(--color-soft-white)]">{value}</span>
    </div>
  )
}

export default async function AdminPedidoDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const session = await auth()
  const orderService = createOrderService()

  let order
  try {
    order = await orderService.getOrder(id, session!.user.id, true)
  } catch {
    notFound()
  }

  const bd = order.birth_data

  return (
    <div className="space-y-8 max-w-3xl">
      {/* Voltar */}
      <Link href="/admin/pedidos">
        <Button variant="ghost" size="sm" className="text-[var(--color-soft-white-dim)] hover:text-[var(--color-gold)] gap-2 -ml-2">
          <ArrowLeft className="w-4 h-4" />
          Voltar aos pedidos
        </Button>
      </Link>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div className="space-y-2">
          <p className="text-xs text-[var(--color-gold)] font-medium tracking-widest uppercase">
            Pedido #{order.id.slice(-8).toUpperCase()}
          </p>
          <h1 className="font-heading text-3xl font-semibold text-[var(--color-soft-white)]">
            {SERVICE_LABELS[order.service_type]}
          </h1>
          <div className="flex items-center gap-3">
            <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${STATUS_COLORS[order.status]}`}>
              {STATUS_LABELS[order.status]}
            </span>
            <span className="text-xs text-[var(--color-soft-white-dim)]/60">
              {formatDate(order.created_at)}
            </span>
          </div>
        </div>
        <p className="font-heading text-2xl font-semibold text-[var(--color-gold)]">
          {formatPrice(order.price_cents)}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Dados do cliente */}
        <div className="rounded-xl border border-[rgba(201,168,76,0.1)] bg-[rgba(255,255,255,0.02)] p-5 space-y-4">
          <h2 className="text-sm font-medium text-[var(--color-gold)] uppercase tracking-widest">
            Dados de nascimento
          </h2>
          <div className="space-y-3">
            <InfoRow label="Nome" value={bd?.full_name} />
            <InfoRow label="Data nasc." value={bd?.birth_date} />
            <InfoRow label="Horário" value={bd?.birth_time_unknown ? 'Desconhecido' : bd?.birth_time} />
            <InfoRow label="Local" value={[bd?.birth_city, bd?.birth_state, bd?.birth_country].filter(Boolean).join(', ')} />
          </div>

          {bd?.partner_full_name && (
            <>
              <div className="h-px bg-[rgba(201,168,76,0.08)] my-2" />
              <p className="text-xs text-[var(--color-gold)] uppercase tracking-widest">Parceiro(a)</p>
              <div className="space-y-3">
                <InfoRow label="Nome" value={bd.partner_full_name} />
                <InfoRow label="Data nasc." value={bd.partner_birth_date} />
                <InfoRow label="Horário" value={bd.partner_birth_time_unknown ? 'Desconhecido' : bd.partner_birth_time} />
                <InfoRow label="Local" value={[bd.partner_birth_city, bd.partner_birth_state, bd.partner_birth_country].filter(Boolean).join(', ')} />
              </div>
            </>
          )}

          {order.notes && (
            <>
              <div className="h-px bg-[rgba(201,168,76,0.08)] my-2" />
              <p className="text-xs text-[var(--color-gold)] uppercase tracking-widest">Observações</p>
              <p className="text-sm text-[var(--color-soft-white-dim)]">{order.notes}</p>
            </>
          )}
        </div>

        {/* Ações admin */}
        <AdminOrderActions order={order} adminId={session!.user.id} />
      </div>

      {/* Notas internas */}
      {order.admin_notes && (
        <div className="rounded-xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] p-5 space-y-2">
          <p className="text-xs text-[var(--color-soft-white-dim)]/50 uppercase tracking-widest">Notas internas</p>
          <p className="text-sm text-[var(--color-soft-white-dim)]">{order.admin_notes}</p>
        </div>
      )}
    </div>
  )
}
