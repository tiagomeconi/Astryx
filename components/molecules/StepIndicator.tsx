import { Check } from 'lucide-react'
import { ORDER_STEPS } from '@/constants/services'

interface Props {
  currentStep: number
}

export function StepIndicator({ currentStep }: Props) {
  return (
    <div className="flex items-center justify-center gap-0">
      {ORDER_STEPS.map((step, i) => {
        const isDone = step.id < currentStep
        const isCurrent = step.id === currentStep
        const isLast = i === ORDER_STEPS.length - 1

        return (
          <div key={step.id} className="flex items-center">
            {/* Círculo */}
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold border-2 transition-all duration-300 ${
                  isDone
                    ? 'bg-[var(--color-gold)] border-[var(--color-gold)] text-[#0e0120]'
                    : isCurrent
                    ? 'border-[var(--color-gold)] text-[var(--color-gold)] bg-[rgba(201,168,76,0.08)]'
                    : 'border-[rgba(255,255,255,0.12)] text-[var(--color-soft-white-dim)]/40 bg-transparent'
                }`}
              >
                {isDone ? <Check className="w-4 h-4" /> : step.id}
              </div>
              <span
                className={`text-xs font-medium transition-colors ${
                  isCurrent
                    ? 'text-[var(--color-gold)]'
                    : isDone
                    ? 'text-[var(--color-soft-white-dim)]'
                    : 'text-[var(--color-soft-white-dim)]/40'
                }`}
              >
                {step.label}
              </span>
            </div>

            {/* Linha conectora */}
            {!isLast && (
              <div
                className={`w-16 sm:w-24 h-px mx-2 mb-5 transition-colors duration-300 ${
                  isDone ? 'bg-[var(--color-gold)]' : 'bg-[rgba(255,255,255,0.08)]'
                }`}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
