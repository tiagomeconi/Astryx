import { Sparkles, Star, Moon, Sun, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SERVICE_LABELS, SERVICE_DESCRIPTIONS, PRICE_TABLE } from '@/constants/services'
import type { ServiceType } from '@/types/database'

const SERVICES: { type: ServiceType; icon: React.ReactNode; highlight?: boolean }[] = [
  { type: 'basic', icon: <Star className="w-5 h-5" /> },
  { type: 'complete', icon: <Sparkles className="w-5 h-5" />, highlight: true },
  { type: 'synastry', icon: <Moon className="w-5 h-5" /> },
  { type: 'solar_return', icon: <Sun className="w-5 h-5" /> },
]

function formatPrice(cents: number) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(cents / 100)
}

interface Props {
  selected: ServiceType | null
  onSelect: (type: ServiceType) => void
  onNext: () => void
}

export function Step1ServiceSelect({ selected, onSelect, onNext }: Props) {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="font-heading text-2xl font-semibold text-[var(--color-soft-white)]">
          Qual mapa você deseja?
        </h2>
        <p className="text-sm text-[var(--color-soft-white-dim)]/70">
          Selecione o serviço que melhor atende ao que você busca.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {SERVICES.map(({ type, icon, highlight }) => {
          const isSelected = selected === type
          return (
            <button
              key={type}
              type="button"
              onClick={() => onSelect(type)}
              className={`relative text-left rounded-xl border p-5 flex flex-col gap-3 transition-all duration-200 group ${
                isSelected
                  ? 'border-[var(--color-gold)] bg-[rgba(201,168,76,0.08)] gold-glow'
                  : 'border-[rgba(201,168,76,0.12)] bg-[rgba(255,255,255,0.02)] hover:border-[rgba(201,168,76,0.3)] hover:bg-[rgba(201,168,76,0.04)]'
              }`}
            >
              {highlight && (
                <div className="absolute -top-2.5 right-4 px-2.5 py-0.5 rounded-full bg-[var(--color-gold)] text-[#0e0120] text-[10px] font-semibold uppercase tracking-wide">
                  Popular
                </div>
              )}

              {/* Ícone + Check */}
              <div className="flex items-center justify-between">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                    isSelected
                      ? 'bg-[rgba(201,168,76,0.2)] text-[var(--color-gold)]'
                      : 'bg-[rgba(255,255,255,0.05)] text-[var(--color-soft-white-dim)] group-hover:text-[var(--color-gold)]'
                  }`}
                >
                  {icon}
                </div>
                {isSelected && (
                  <div className="w-5 h-5 rounded-full bg-[var(--color-gold)] flex items-center justify-center">
                    <Check className="w-3 h-3 text-[#0e0120]" />
                  </div>
                )}
              </div>

              {/* Texto */}
              <div className="space-y-1 flex-1">
                <p className="font-medium text-[var(--color-soft-white)]">
                  {SERVICE_LABELS[type]}
                </p>
                <p className="text-xs text-[var(--color-soft-white-dim)]/70 leading-relaxed">
                  {SERVICE_DESCRIPTIONS[type]}
                </p>
              </div>

              {/* Preço */}
              <p className="font-heading text-xl font-semibold text-[var(--color-gold)]">
                {formatPrice(PRICE_TABLE[type])}
              </p>
            </button>
          )
        })}
      </div>

      <div className="flex justify-end pt-2">
        <Button
          onClick={onNext}
          disabled={!selected}
          className="px-8 bg-[var(--color-gold)] text-[#0e0120] hover:bg-[var(--color-gold-light)] font-semibold disabled:opacity-40"
        >
          Continuar
        </Button>
      </div>
    </div>
  )
}
