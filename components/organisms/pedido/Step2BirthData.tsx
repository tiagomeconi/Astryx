'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowLeft } from 'lucide-react'
import { birthDataSchema, type BirthDataInput } from '@/lib/validations/order'
import type { ServiceType } from '@/types/database'

const inputClass =
  'bg-[rgba(255,255,255,0.04)] border-[rgba(201,168,76,0.2)] text-[var(--color-soft-white)] placeholder:text-[var(--color-soft-white-dim)]/40 focus-visible:border-[var(--color-gold)] focus-visible:ring-[var(--color-gold)]/20'

interface Props {
  serviceType: ServiceType
  defaultValues?: Partial<BirthDataInput>
  onNext: (data: BirthDataInput) => void
  onBack: () => void
}

function FieldGroup({
  title,
  children,
}: {
  title?: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-4">
      {title && (
        <p className="text-xs font-medium text-[var(--color-gold)] uppercase tracking-widest">
          {title}
        </p>
      )}
      {children}
    </div>
  )
}

function Field({
  label,
  error,
  children,
  hint,
}: {
  label: string
  error?: string
  children: React.ReactNode
  hint?: string
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-[var(--color-soft-white-dim)] text-sm">{label}</Label>
      {children}
      {hint && <p className="text-xs text-[var(--color-soft-white-dim)]/50">{hint}</p>}
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  )
}

export function Step2BirthData({ serviceType, defaultValues, onNext, onBack }: Props) {
  const isSynastry = serviceType === 'synastry'

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } = useForm<BirthDataInput>({
    resolver: zodResolver(birthDataSchema) as any,
    defaultValues: { birth_time_unknown: false, partner_birth_time_unknown: false, ...defaultValues },
  })

  const birthTimeUnknown = watch('birth_time_unknown')
  const partnerTimeUnknown = watch('partner_birth_time_unknown')

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-8" noValidate>
      <div className="space-y-1">
        <h2 className="font-heading text-2xl font-semibold text-[var(--color-soft-white)]">
          Dados de nascimento
        </h2>
        <p className="text-sm text-[var(--color-soft-white-dim)]/70">
          Informações precisas garantem um mapa astral mais fiel.
        </p>
      </div>

      {/* ── Pessoa principal ── */}
      <FieldGroup title={isSynastry ? 'Você' : undefined}>
        <Field label="Nome completo" error={errors.full_name?.message}>
          <Input className={inputClass} placeholder="Nome da pessoa do mapa" {...register('full_name')} />
        </Field>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Data de nascimento" error={errors.birth_date?.message}>
            <Input
              type="date"
              className={inputClass}
              style={{ colorScheme: 'dark' }}
              {...register('birth_date')}
            />
          </Field>

          <Field
            label="Horário de nascimento"
            error={errors.birth_time?.message}
            hint={birthTimeUnknown ? 'Campo desabilitado' : 'Ex: 14:30'}
          >
            <Input
              type="time"
              className={inputClass}
              style={{ colorScheme: 'dark' }}
              disabled={birthTimeUnknown}
              {...register('birth_time')}
            />
          </Field>
        </div>

        {/* Horário desconhecido */}
        <label className="flex items-center gap-2.5 cursor-pointer group w-fit">
          <div
            className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
              birthTimeUnknown
                ? 'bg-[var(--color-gold)] border-[var(--color-gold)]'
                : 'border-[rgba(201,168,76,0.3)] group-hover:border-[var(--color-gold)]'
            }`}
            onClick={() => setValue('birth_time_unknown', !birthTimeUnknown)}
          >
            {birthTimeUnknown && (
              <svg className="w-2.5 h-2.5 text-[#0e0120]" fill="currentColor" viewBox="0 0 12 12">
                <path d="M10 3L5 8.5 2 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
            )}
          </div>
          <input type="checkbox" className="sr-only" {...register('birth_time_unknown')} />
          <span className="text-sm text-[var(--color-soft-white-dim)]">Não sei o horário exato</span>
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Field label="Cidade" error={errors.birth_city?.message}>
            <Input className={inputClass} placeholder="São Paulo" {...register('birth_city')} />
          </Field>
          <Field label="Estado" error={errors.birth_state?.message}>
            <Input className={inputClass} placeholder="SP" {...register('birth_state')} />
          </Field>
          <Field label="País" error={errors.birth_country?.message}>
            <Input className={inputClass} placeholder="Brasil" {...register('birth_country')} />
          </Field>
        </div>
      </FieldGroup>

      {/* ── Parceiro (sinastria) ── */}
      {isSynastry && (
        <>
          <div className="h-px bg-gradient-to-r from-transparent via-[rgba(201,168,76,0.2)] to-transparent" />

          <FieldGroup title="Parceiro(a)">
            <Field label="Nome completo" error={errors.partner_full_name?.message}>
              <Input className={inputClass} placeholder="Nome do parceiro(a)" {...register('partner_full_name')} />
            </Field>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Data de nascimento" error={errors.partner_birth_date?.message}>
                <Input
                  type="date"
                  className={inputClass}
                  style={{ colorScheme: 'dark' }}
                  {...register('partner_birth_date')}
                />
              </Field>

              <Field
                label="Horário de nascimento"
                error={errors.partner_birth_time?.message}
                hint={partnerTimeUnknown ? 'Campo desabilitado' : 'Ex: 14:30'}
              >
                <Input
                  type="time"
                  className={inputClass}
                  style={{ colorScheme: 'dark' }}
                  disabled={partnerTimeUnknown}
                  {...register('partner_birth_time')}
                />
              </Field>
            </div>

            <label className="flex items-center gap-2.5 cursor-pointer group w-fit">
              <div
                className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                  partnerTimeUnknown
                    ? 'bg-[var(--color-gold)] border-[var(--color-gold)]'
                    : 'border-[rgba(201,168,76,0.3)] group-hover:border-[var(--color-gold)]'
                }`}
                onClick={() => setValue('partner_birth_time_unknown', !partnerTimeUnknown)}
              >
                {partnerTimeUnknown && (
                  <svg className="w-2.5 h-2.5 text-[#0e0120]" fill="currentColor" viewBox="0 0 12 12">
                    <path d="M10 3L5 8.5 2 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  </svg>
                )}
              </div>
              <input type="checkbox" className="sr-only" {...register('partner_birth_time_unknown')} />
              <span className="text-sm text-[var(--color-soft-white-dim)]">Não sei o horário exato</span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Field label="Cidade" error={errors.partner_birth_city?.message}>
                <Input className={inputClass} placeholder="Rio de Janeiro" {...register('partner_birth_city')} />
              </Field>
              <Field label="Estado" error={errors.partner_birth_state?.message}>
                <Input className={inputClass} placeholder="RJ" {...register('partner_birth_state')} />
              </Field>
              <Field label="País" error={errors.partner_birth_country?.message}>
                <Input className={inputClass} placeholder="Brasil" {...register('partner_birth_country')} />
              </Field>
            </div>
          </FieldGroup>
        </>
      )}

      {/* Navegação */}
      <div className="flex items-center justify-between pt-2">
        <Button
          type="button"
          variant="ghost"
          onClick={onBack}
          className="text-[var(--color-soft-white-dim)] hover:text-[var(--color-soft-white)] gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar
        </Button>
        <Button
          type="submit"
          className="px-8 bg-[var(--color-gold)] text-[#0e0120] hover:bg-[var(--color-gold-light)] font-semibold"
        >
          Revisar pedido
        </Button>
      </div>
    </form>
  )
}
