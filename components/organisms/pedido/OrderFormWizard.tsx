'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { StepIndicator } from '@/components/molecules/StepIndicator'
import { Step1ServiceSelect } from './Step1ServiceSelect'
import { Step2BirthData } from './Step2BirthData'
import { Step3Confirmation } from './Step3Confirmation'
import type { ServiceType } from '@/types/database'
import type { BirthDataInput } from '@/lib/validations/order'

export function OrderFormWizard() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [serviceType, setServiceType] = useState<ServiceType | null>(null)
  const [birthData, setBirthData] = useState<BirthDataInput | null>(null)

  const handleStep1Next = () => {
    if (serviceType) setStep(2)
  }

  const handleStep2Next = (data: BirthDataInput) => {
    setBirthData(data)
    setStep(3)
  }

  const handleConfirm = async () => {
    if (!serviceType || !birthData) return
    setIsSubmitting(true)

    try {
      const res = await fetch('/api/pedidos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ service_type: serviceType, birth_data: birthData }),
      })

      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        toast.error(body.error ?? 'Erro ao criar pedido. Tente novamente.')
        return
      }

      const order = await res.json()
      toast.success('Pedido realizado com sucesso!')
      router.push(`/pedido/sucesso?id=${order.id}`)
    } catch {
      toast.error('Erro inesperado. Tente novamente.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-10">
      <StepIndicator currentStep={step} />

      <div className="rounded-2xl border border-[rgba(201,168,76,0.12)] bg-[rgba(26,5,51,0.6)] backdrop-blur-sm p-6 sm:p-8">
        {step === 1 && (
          <Step1ServiceSelect
            selected={serviceType}
            onSelect={setServiceType}
            onNext={handleStep1Next}
          />
        )}

        {step === 2 && serviceType && (
          <Step2BirthData
            serviceType={serviceType}
            defaultValues={birthData ?? undefined}
            onNext={handleStep2Next}
            onBack={() => setStep(1)}
          />
        )}

        {step === 3 && serviceType && birthData && (
          <Step3Confirmation
            serviceType={serviceType}
            birthData={birthData}
            isSubmitting={isSubmitting}
            onBack={() => setStep(2)}
            onConfirm={handleConfirm}
          />
        )}
      </div>
    </div>
  )
}
