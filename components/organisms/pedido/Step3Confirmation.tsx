import { ArrowLeft, Loader2, User, Calendar, Clock, MapPin, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SERVICE_LABELS, PRICE_TABLE } from '@/constants/services'
import type { ServiceType } from '@/types/database'
import type { BirthDataInput } from '@/lib/validations/order'

interface Props {
  serviceType: ServiceType
  birthData: BirthDataInput
  notes?: string
  isSubmitting: boolean
  onBack: () => void
  onConfirm: () => void
}

function formatPrice(cents: number) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(cents / 100)
}

function InfoRow({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value?: string }) {
  if (!value) return null
  return (
    <div className="flex items-start gap-3">
      <Icon className="w-4 h-4 text-[var(--color-gold)] mt-0.5 shrink-0" />
      <div>
        <p className="text-xs text-[var(--color-soft-white-dim)]/60">{label}</p>
        <p className="text-sm text-[var(--color-soft-white)]">{value}</p>
      </div>
    </div>
  )
}

function PersonBlock({ title, data }: { title: string; data: BirthDataInput; isPartner?: boolean }) {
  const location = [data.birth_city, data.birth_state, data.birth_country].filter(Boolean).join(', ')

  return (
    <div className="space-y-3">
      <p className="text-xs font-medium text-[var(--color-gold)] uppercase tracking-widest">{title}</p>
      <div className="space-y-3 pl-1">
        <InfoRow icon={User} label="Nome" value={data.full_name} />
        <InfoRow icon={Calendar} label="Data de nascimento" value={data.birth_date} />
        <InfoRow
          icon={Clock}
          label="Horário"
          value={data.birth_time_unknown ? 'Desconhecido' : data.birth_time}
        />
        <InfoRow icon={MapPin} label="Local" value={location} />
      </div>
    </div>
  )
}

export function Step3Confirmation({ serviceType, birthData, notes, isSubmitting, onBack, onConfirm }: Props) {
  const isSynastry = serviceType === 'synastry'

  const partnerLocation = isSynastry
    ? [birthData.partner_birth_city, birthData.partner_birth_state, birthData.partner_birth_country]
        .filter(Boolean)
        .join(', ')
    : undefined

  const partnerData: BirthDataInput | null =
    isSynastry && birthData.partner_full_name
      ? {
          ...birthData,
          full_name: birthData.partner_full_name!,
          birth_date: birthData.partner_birth_date!,
          birth_time: birthData.partner_birth_time,
          birth_time_unknown: birthData.partner_birth_time_unknown ?? false,
          birth_city: birthData.partner_birth_city ?? '',
          birth_state: birthData.partner_birth_state,
          birth_country: birthData.partner_birth_country ?? '',
        }
      : null

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="font-heading text-2xl font-semibold text-[var(--color-soft-white)]">
          Revise seu pedido
        </h2>
        <p className="text-sm text-[var(--color-soft-white-dim)]/70">
          Confirme os dados antes de finalizar.
        </p>
      </div>

      {/* Serviço selecionado */}
      <div className="rounded-xl border border-[rgba(201,168,76,0.25)] bg-[rgba(201,168,76,0.05)] p-5 flex items-center justify-between">
        <div>
          <p className="text-xs text-[var(--color-gold)] uppercase tracking-widest mb-1">Serviço</p>
          <p className="font-heading text-xl font-semibold text-[var(--color-soft-white)]">
            {SERVICE_LABELS[serviceType]}
          </p>
        </div>
        <p className="font-heading text-2xl font-semibold text-[var(--color-gold)]">
          {formatPrice(PRICE_TABLE[serviceType])}
        </p>
      </div>

      {/* Dados */}
      <div className="rounded-xl border border-[rgba(201,168,76,0.1)] bg-[rgba(255,255,255,0.02)] p-5 space-y-5">
        <PersonBlock title={isSynastry ? 'Você' : 'Dados de nascimento'} data={birthData} />

        {partnerData && (
          <>
            <div className="h-px bg-[rgba(201,168,76,0.08)]" />
            <PersonBlock title="Parceiro(a)" data={partnerData} isPartner />
          </>
        )}

        {notes && (
          <>
            <div className="h-px bg-[rgba(201,168,76,0.08)]" />
            <div className="flex items-start gap-3">
              <FileText className="w-4 h-4 text-[var(--color-gold)] mt-0.5 shrink-0" />
              <div>
                <p className="text-xs text-[var(--color-soft-white-dim)]/60">Observações</p>
                <p className="text-sm text-[var(--color-soft-white)]">{notes}</p>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Aviso de prazo */}
      <p className="text-xs text-[var(--color-soft-white-dim)]/50 text-center">
        Entrega em até {serviceType === 'synastry' ? '7' : '5'} dias úteis após a confirmação.
        Você será notificada quando seu mapa estiver pronto.
      </p>

      {/* Navegação */}
      <div className="flex items-center justify-between pt-2">
        <Button
          type="button"
          variant="ghost"
          onClick={onBack}
          disabled={isSubmitting}
          className="text-[var(--color-soft-white-dim)] hover:text-[var(--color-soft-white)] gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar
        </Button>
        <Button
          onClick={onConfirm}
          disabled={isSubmitting}
          className="px-8 bg-[var(--color-gold)] text-[#0e0120] hover:bg-[var(--color-gold-light)] font-semibold shadow-lg shadow-[rgba(201,168,76,0.25)] disabled:opacity-60"
        >
          {isSubmitting ? (
            <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Enviando...</>
          ) : (
            'Confirmar pedido'
          )}
        </Button>
      </div>
    </div>
  )
}
