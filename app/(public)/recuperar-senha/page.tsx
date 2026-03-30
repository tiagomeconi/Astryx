'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Star, ArrowLeft, Loader2, Mail } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { StarfieldCanvas } from '@/components/StarfieldCanvas'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const schema = z.object({
  email: z.string().email('E-mail inválido'),
})

type Input = z.infer<typeof schema>

export default function RecuperarSenhaPage() {
  const [sent, setSent] = useState(false)

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<Input>({ resolver: zodResolver(schema) })

  const onSubmit = async (data: Input) => {
    // TODO: implementar envio de e-mail (Fase 6 — após Supabase)
    await new Promise((r) => setTimeout(r, 800)) // simula request
    setSent(true)
    toast.success('Se o e-mail existir, você receberá as instruções em breve.')
  }

  return (
    <>
      <StarfieldCanvas />
      <div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-16">
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            background:
              'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(79,70,229,0.12) 0%, transparent 70%)',
          }}
        />

        <div className="relative z-10 w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="text-center space-y-2">
            <Link href="/" className="inline-flex items-center gap-2 group">
              <Star
                className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300"
                style={{ color: 'var(--color-gold)' }}
                fill="currentColor"
              />
              <span className="text-2xl font-heading font-semibold text-[var(--color-soft-white)]">
                Astryx
              </span>
            </Link>
            <h1 className="font-heading text-3xl font-semibold text-[var(--color-soft-white)]">
              Recuperar senha
            </h1>
          </div>

          {/* Card */}
          <div className="rounded-2xl border border-[rgba(201,168,76,0.15)] bg-[rgba(26,5,51,0.7)] backdrop-blur-sm p-8">
            {sent ? (
              <div className="text-center space-y-5 py-4">
                <div className="w-14 h-14 rounded-full bg-[rgba(201,168,76,0.1)] border border-[rgba(201,168,76,0.3)] flex items-center justify-center mx-auto">
                  <Mail className="w-6 h-6 text-[var(--color-gold)]" />
                </div>
                <div className="space-y-2">
                  <p className="font-medium text-[var(--color-soft-white)]">E-mail enviado!</p>
                  <p className="text-sm text-[var(--color-soft-white-dim)]/70">
                    Verifique sua caixa de entrada em{' '}
                    <span className="text-[var(--color-gold)]">{getValues('email')}</span> e siga
                    as instruções para redefinir sua senha.
                  </p>
                </div>
                <Link href="/login">
                  <Button variant="ghost" className="text-[var(--color-gold)] hover:text-[var(--color-gold-light)] gap-2">
                    <ArrowLeft className="w-4 h-4" />
                    Voltar ao login
                  </Button>
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
                <p className="text-sm text-[var(--color-soft-white-dim)]/70 pb-1">
                  Informe seu e-mail e enviaremos as instruções para criar uma nova senha.
                </p>

                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-[var(--color-soft-white-dim)] text-sm">
                    E-mail
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    autoComplete="email"
                    className="bg-[rgba(255,255,255,0.04)] border-[rgba(201,168,76,0.2)] text-[var(--color-soft-white)] placeholder:text-[var(--color-soft-white-dim)]/40 focus-visible:border-[var(--color-gold)] focus-visible:ring-[var(--color-gold)]/20"
                    {...register('email')}
                  />
                  {errors.email && <p className="text-xs text-red-400">{errors.email.message}</p>}
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-5 font-semibold bg-[var(--color-gold)] text-[#0e0120] hover:bg-[var(--color-gold-light)] disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Enviando...</>
                  ) : (
                    'Enviar instruções'
                  )}
                </Button>

                <Link href="/login" className="flex items-center justify-center gap-1.5 text-sm text-[var(--color-soft-white-dim)]/60 hover:text-[var(--color-gold)] transition-colors">
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Voltar ao login
                </Link>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
