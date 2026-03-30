'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Loader2, Upload, CheckCircle, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { STATUS_LABELS, STATUS_COLORS } from '@/constants/services'
import type { Order, OrderStatus } from '@/types/database'

const VALID_TRANSITIONS: Record<OrderStatus, OrderStatus[]> = {
  pending: ['confirmed', 'cancelled'],
  confirmed: ['in_progress', 'cancelled'],
  in_progress: ['delivered', 'cancelled'],
  delivered: [],
  cancelled: [],
}

interface Props {
  order: Order
  adminId: string
}

export function AdminOrderActions({ order, adminId }: Props) {
  const router = useRouter()
  const [isUpdating, setIsUpdating] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [dragOver, setDragOver] = useState(false)

  const nextStatuses = VALID_TRANSITIONS[order.status]

  const updateStatus = async (newStatus: OrderStatus) => {
    setIsUpdating(true)
    try {
      const res = await fetch(`/api/pedidos/${order.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus, admin_id: adminId }),
      })
      if (!res.ok) throw new Error()
      toast.success(`Status atualizado para "${STATUS_LABELS[newStatus]}"`)
      router.refresh()
    } catch {
      toast.error('Erro ao atualizar status.')
    } finally {
      setIsUpdating(false)
    }
  }

  const uploadPdf = async (file: File) => {
    if (file.type !== 'application/pdf') {
      toast.error('Apenas arquivos PDF são aceitos.')
      return
    }
    if (file.size > 20 * 1024 * 1024) {
      toast.error('Arquivo muito grande. Máximo 20MB.')
      return
    }

    setIsUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)

      const res = await fetch(`/api/pedidos/${order.id}/pdf`, {
        method: 'POST',
        body: formData,
      })
      if (!res.ok) throw new Error()
      toast.success('PDF enviado com sucesso!')
      router.refresh()
    } catch {
      toast.error('Erro ao enviar PDF.')
    } finally {
      setIsUploading(false)
    }
  }

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file) uploadPdf(file)
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) uploadPdf(file)
  }

  return (
    <div className="space-y-4">
      {/* Atualizar status */}
      <div className="rounded-xl border border-[rgba(201,168,76,0.1)] bg-[rgba(255,255,255,0.02)] p-5 space-y-4">
        <h2 className="text-sm font-medium text-[var(--color-gold)] uppercase tracking-widest">
          Atualizar status
        </h2>

        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs text-[var(--color-soft-white-dim)]/60">Atual:</span>
          <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${STATUS_COLORS[order.status]}`}>
            {STATUS_LABELS[order.status]}
          </span>
        </div>

        {nextStatuses.length === 0 ? (
          <p className="text-sm text-[var(--color-soft-white-dim)]/50">
            {order.status === 'delivered' ? 'Pedido finalizado.' : 'Pedido cancelado.'}
          </p>
        ) : (
          <div className="flex flex-col gap-2">
            {nextStatuses.map((s) => {
              const isCancel = s === 'cancelled'
              return (
                <Button
                  key={s}
                  onClick={() => updateStatus(s)}
                  disabled={isUpdating}
                  variant={isCancel ? 'ghost' : 'default'}
                  className={
                    isCancel
                      ? 'text-red-400 hover:text-red-300 hover:bg-red-400/10 border border-red-400/20 justify-start gap-2'
                      : 'bg-[var(--color-gold)] text-[#0e0120] hover:bg-[var(--color-gold-light)] font-semibold justify-start gap-2'
                  }
                >
                  {isUpdating ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : isCancel ? (
                    <X className="w-4 h-4" />
                  ) : (
                    <CheckCircle className="w-4 h-4" />
                  )}
                  Marcar como {STATUS_LABELS[s]}
                </Button>
              )
            })}
          </div>
        )}
      </div>

      {/* Upload PDF */}
      <div className="rounded-xl border border-[rgba(201,168,76,0.1)] bg-[rgba(255,255,255,0.02)] p-5 space-y-4">
        <h2 className="text-sm font-medium text-[var(--color-gold)] uppercase tracking-widest">
          {order.astral_chart ? 'Substituir PDF' : 'Upload do mapa (PDF)'}
        </h2>

        {order.astral_chart && (
          <div className="flex items-center gap-2 text-emerald-400 text-sm">
            <CheckCircle className="w-4 h-4" />
            PDF já enviado — {order.astral_chart.pdf_filename}
          </div>
        )}

        {/* Zona de drop */}
        <label
          onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleFileDrop}
          className={`flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed p-8 cursor-pointer transition-all duration-200 ${
            dragOver
              ? 'border-[var(--color-gold)] bg-[rgba(201,168,76,0.08)]'
              : 'border-[rgba(201,168,76,0.2)] hover:border-[rgba(201,168,76,0.4)] hover:bg-[rgba(201,168,76,0.04)]'
          }`}
        >
          {isUploading ? (
            <>
              <Loader2 className="w-8 h-8 text-[var(--color-gold)] animate-spin" />
              <p className="text-sm text-[var(--color-soft-white-dim)]">Enviando...</p>
            </>
          ) : (
            <>
              <Upload className="w-8 h-8 text-[var(--color-soft-white-dim)]/40" />
              <div className="text-center">
                <p className="text-sm text-[var(--color-soft-white-dim)]">
                  Arraste o PDF aqui ou{' '}
                  <span className="text-[var(--color-gold)]">clique para selecionar</span>
                </p>
                <p className="text-xs text-[var(--color-soft-white-dim)]/40 mt-1">PDF · máx. 20MB</p>
              </div>
            </>
          )}
          <input
            type="file"
            accept="application/pdf"
            className="sr-only"
            onChange={handleFileInput}
            disabled={isUploading}
          />
        </label>
      </div>
    </div>
  )
}
