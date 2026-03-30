import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { auth } from '@/lib/auth'
import { createOrderService } from '@/lib/container'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowLeft, Download, Calendar, Clock, MapPin } from 'lucide-react'
import { SERVICE_LABELS, STATUS_LABELS, STATUS_COLORS } from '@/constants/services'

export const metadata: Metadata = { title: 'Detalhe do Pedido' }

function formatDate(iso: string) {
  return new Intl.DateTimeFormat('pt-BR', { dateStyle: 'long' }).format(new Date(iso))
}

function formatPrice(cents: number) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(cents / 100)
}

function InfoRow({ label, value }: { label: string; value?: string | null }) {
  if (!value) return null
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-1">
      <span className="text-xs text-[var(--color-soft-white-dim)]/60 sm:w-36 shrink-0">{label}</span>
      <span className="text-sm text-[var(--color-soft-white)]">{value}</span>
    </div>
  )
}

export default async function PedidoDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const session = await auth()
  const orderService = createOrderService()

  let order
  try {
    order = await orderService.getOrder(id, session!.user.id, session!.user.role === 'admin')
  } catch {
    notFound()
  }

  const bd = order.birth_data

  return (
    <div className="space-y-8 max-w-2xl">
      {/* Voltar */}
      <Link href="/pedidos">
        <Button variant="ghost" size="sm" className="text-[var(--color-soft-white-dim)] hover:text-[var(--color-gold)] gap-2 -ml-2">
          <ArrowLeft className="w-4 h-4" />
          Voltar aos pedidos
        </Button>
      </Link>

      {/* Header */}
      <div className="space-y-2">
        <p className="text-sm text-[var(--color-gold)] font-medium tracking-widest uppercase">
          Pedido #{order.id.slice(-8).toUpperCase()}
        </p>
        <h1 className="font-heading text-4xl font-semibold text-[var(--color-soft-white)]">
          {SERVICE_LABELS[order.service_type]}
        </h1>
        <div className="flex items-center gap-3">
          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${STATUS_COLORS[order.status]}`}>
            {STATUS_LABELS[order.status]}
          </span>
          <span className="text-sm text-[var(--color-soft-white-dim)]/60">
            Solicitado em {formatDate(order.created_at)}
          </span>
        </div>
      </div>

      {/* Download PDF */}
      {order.status === 'delivered' && order.astral_chart && (
        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-6 flex items-center justify-between gap-4">
          <div>
            <p className="font-medium text-emerald-400">Seu mapa está pronto!</p>
            <p className="text-sm text-[var(--color-soft-white-dim)]/70 mt-0.5">
              Faça o download do PDF para acessar sua leitura completa.
            </p>
          </div>
          <a href={`/api/pedidos/${order.id}/pdf`} download>
            <Button className="bg-emerald-500 hover:bg-emerald-400 text-white font-semibold gap-2 shrink-0">
              <Download className="w-4 h-4" />
              Baixar PDF
            </Button>
          </a>
        </div>
      )}

      {/* Timeline de status */}
      <div className="rounded-2xl border border-[rgba(201,168,76,0.1)] bg-[rgba(255,255,255,0.02)] p-6 space-y-4">
        <h2 className="font-heading text-xl font-semibold text-[var(--color-soft-white)]">
          Status do pedido
        </h2>
        {(['pending', 'confirmed', 'in_progress', 'delivered'] as const).map((s) => {
          const statuses = ['pending', 'confirmed', 'in_progress', 'delivered']
          const currentIdx = statuses.indexOf(order.status)
          const stepIdx = statuses.indexOf(s)
          const isDone = stepIdx <= currentIdx && order.status !== 'cancelled'
          const isCurrent = s === order.status

          return (
            <div key={s} className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full shrink-0 ${isDone ? 'bg-[var(--color-gold)]' : 'bg-[rgba(255,255,255,0.1)]'} ${isCurrent ? 'ring-2 ring-[var(--color-gold)]/30' : ''}`} />
              <span className={`text-sm ${isCurrent ? 'text-[var(--color-gold)] font-medium' : isDone ? 'text-[var(--color-soft-white-dim)]' : 'text-[var(--color-soft-white-dim)]/40'}`}>
                {STATUS_LABELS[s]}
              </span>
            </div>
          )
        })}
        {order.status === 'cancelled' && (
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full shrink-0 bg-red-500" />
            <span className="text-sm text-red-400 font-medium">Cancelado</span>
          </div>
        )}
      </div>

      {/* Dados de nascimento */}
      {bd && (
        <div className="rounded-2xl border border-[rgba(201,168,76,0.1)] bg-[rgba(255,255,255,0.02)] p-6 space-y-4">
          <h2 className="font-heading text-xl font-semibold text-[var(--color-soft-white)]">
            Dados fornecidos
          </h2>
          <div className="space-y-3">
            <InfoRow label="Nome" value={bd.full_name} />
            <InfoRow label="Data de nascimento" value={bd.birth_date} />
            <InfoRow
              label="Horário"
              value={bd.birth_time_unknown ? 'Desconhecido' : bd.birth_time}
            />
            <InfoRow
              label="Local"
              value={[bd.birth_city, bd.birth_state, bd.birth_country].filter(Boolean).join(', ')}
            />
            {bd.partner_full_name && (
              <>
                <div className="pt-2 border-t border-[rgba(201,168,76,0.08)]">
                  <p className="text-xs text-[var(--color-gold)] uppercase tracking-widest mb-3">
                    Parceiro(a)
                  </p>
                </div>
                <InfoRow label="Nome" value={bd.partner_full_name} />
                <InfoRow label="Data de nascimento" value={bd.partner_birth_date} />
                <InfoRow
                  label="Horário"
                  value={bd.partner_birth_time_unknown ? 'Desconhecido' : bd.partner_birth_time}
                />
                <InfoRow
                  label="Local"
                  value={[bd.partner_birth_city, bd.partner_birth_state, bd.partner_birth_country].filter(Boolean).join(', ')}
                />
              </>
            )}
          </div>
        </div>
      )}

      {/* Resumo financeiro */}
      <div className="rounded-2xl border border-[rgba(201,168,76,0.1)] bg-[rgba(255,255,255,0.02)] p-6">
        <div className="flex items-center justify-between">
          <span className="text-[var(--color-soft-white-dim)]">Total pago</span>
          <span className="font-heading text-2xl font-semibold text-[var(--color-gold)]">
            {formatPrice(order.price_cents)}
          </span>
        </div>
      </div>

      {/* Observações do cliente */}
      {order.notes && (
        <div className="rounded-2xl border border-[rgba(201,168,76,0.1)] bg-[rgba(255,255,255,0.02)] p-6 space-y-2">
          <h2 className="text-sm font-medium text-[var(--color-soft-white-dim)] uppercase tracking-widest">
            Observações
          </h2>
          <p className="text-sm text-[var(--color-soft-white-dim)]">{order.notes}</p>
        </div>
      )}
    </div>
  )
}
