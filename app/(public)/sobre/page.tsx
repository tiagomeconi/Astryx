import type { Metadata } from 'next'
import Link from 'next/link'
import { Star, Heart, Shield, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Sobre',
  description: 'Conheça a Astryx — astrologia de alta qualidade para seu autoconhecimento.',
}

const VALUES = [
  {
    icon: <Star className="w-5 h-5" />,
    title: 'Precisão',
    desc: 'Cada mapa é calculado com dados exatos de nascimento e interpretado com rigor astrológico.',
  },
  {
    icon: <Heart className="w-5 h-5" />,
    title: 'Cuidado',
    desc: 'Tratamos cada mapa como único, porque cada pessoa é única. Nenhum texto genérico.',
  },
  {
    icon: <Shield className="w-5 h-5" />,
    title: 'Privacidade',
    desc: 'Seus dados pessoais são tratados com sigilo absoluto e não são compartilhados com terceiros.',
  },
  {
    icon: <Sparkles className="w-5 h-5" />,
    title: 'Profundidade',
    desc: 'Vamos além do Sol e do Ascendente. Cada interpretação mergulha nas camadas mais sutis do seu mapa.',
  },
]

const DIFFERENTIALS = [
  'Interpretação 100% personalizada — não usamos textos prontos',
  'Linguagem acessível, sem jargões desnecessários',
  'PDF com design cuidadoso e navegação por capítulos',
  'Atendimento humano via mensagem para dúvidas',
  'Anos de estudo e prática em astrologia tradicional e moderna',
]

export default function SobrePage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-xs font-medium tracking-widest uppercase text-[var(--color-gold)]">
                Quem somos
              </p>
              <h1 className="font-heading text-5xl font-semibold text-[var(--color-soft-white)] leading-tight">
                Astrologia feita com{' '}
                <span className="text-gradient-gold italic">alma e precisão</span>
              </h1>
              <p className="text-[var(--color-soft-white-dim)] leading-relaxed">
                A Astryx nasceu da crença de que o autoconhecimento é o caminho mais honesto
                para uma vida mais plena. A astrologia, quando praticada com seriedade, é uma
                das ferramentas mais poderosas para isso.
              </p>
              <p className="text-[var(--color-soft-white-dim)] leading-relaxed">
                Cada mapa que elaboramos é único. Não usamos textos genéricos nem interpretações
                automáticas. É um trabalho artesanal, feito com atenção e cuidado para cada pessoa.
              </p>
            </div>

            {/* Visual decorativo */}
            <div className="flex items-center justify-center">
              <div className="relative w-64 h-64">
                {/* Círculos concêntricos */}
                <div className="absolute inset-0 rounded-full border border-[rgba(201,168,76,0.15)]" />
                <div className="absolute inset-6 rounded-full border border-[rgba(201,168,76,0.1)]" />
                <div className="absolute inset-12 rounded-full border border-[rgba(201,168,76,0.08)]" />
                {/* Centro */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full bg-[rgba(201,168,76,0.08)] border border-[rgba(201,168,76,0.3)] flex items-center justify-center">
                    <Star className="w-10 h-10 text-[var(--color-gold)]" fill="currentColor" />
                  </div>
                </div>
                {/* Pontos decorativos */}
                {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                  <div
                    key={deg}
                    className="absolute w-2 h-2 rounded-full bg-[var(--color-gold)]/30"
                    style={{
                      top: `${50 + 46 * Math.sin((deg * Math.PI) / 180)}%`,
                      left: `${50 + 46 * Math.cos((deg * Math.PI) / 180)}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="py-20 px-4 border-t border-[rgba(201,168,76,0.1)]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-14 space-y-3">
            <p className="text-xs font-medium tracking-widest uppercase text-[var(--color-gold)]">
              Nossos valores
            </p>
            <h2 className="font-heading text-4xl font-semibold text-[var(--color-soft-white)]">
              O que nos guia
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {VALUES.map(({ icon, title, desc }) => (
              <div
                key={title}
                className="flex gap-4 p-6 rounded-xl border border-[rgba(201,168,76,0.1)] bg-[rgba(255,255,255,0.02)] hover:border-[rgba(201,168,76,0.25)] transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-[rgba(201,168,76,0.1)] text-[var(--color-gold)] flex items-center justify-center shrink-0">
                  {icon}
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold text-[var(--color-soft-white)] mb-1">
                    {title}
                  </h3>
                  <p className="text-sm text-[var(--color-soft-white-dim)] leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Diferenciais */}
      <section className="py-20 px-4 border-t border-[rgba(201,168,76,0.1)]">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-12 space-y-3">
            <p className="text-xs font-medium tracking-widest uppercase text-[var(--color-gold)]">
              Por que nos escolher
            </p>
            <h2 className="font-heading text-4xl font-semibold text-[var(--color-soft-white)]">
              Nossos diferenciais
            </h2>
          </div>
          <ul className="space-y-4">
            {DIFFERENTIALS.map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-4 p-5 rounded-xl border border-[rgba(201,168,76,0.1)] bg-[rgba(255,255,255,0.02)]"
              >
                <div className="w-7 h-7 rounded-full bg-[rgba(201,168,76,0.12)] border border-[rgba(201,168,76,0.3)] flex items-center justify-center shrink-0">
                  <span className="text-xs font-semibold text-[var(--color-gold)]">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <p className="text-[var(--color-soft-white-dim)] leading-relaxed pt-0.5">{item}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 text-center border-t border-[rgba(201,168,76,0.1)]">
        <div className="container mx-auto max-w-md space-y-6">
          <h2 className="font-heading text-3xl font-semibold text-[var(--color-soft-white)]">
            Conheça seu mapa
          </h2>
          <p className="text-[var(--color-soft-white-dim)]">
            Dê o primeiro passo no seu autoconhecimento com um mapa astral de verdade.
          </p>
          <Link href="/pedido">
            <Button className="px-10 py-5 bg-[var(--color-gold)] text-[#0e0120] hover:bg-[var(--color-gold-light)] font-semibold shadow-lg shadow-[rgba(201,168,76,0.25)]">
              Solicitar Meu Mapa
            </Button>
          </Link>
        </div>
      </section>
    </>
  )
}
