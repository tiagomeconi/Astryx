import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Perguntas frequentes sobre mapas astrais, processo de entrega e astrologia.',
}

const FAQ_CATEGORIES = [
  {
    category: 'Sobre o Mapa Astral',
    items: [
      {
        q: 'O que é um mapa astral?',
        a: 'O mapa astral é um retrato do céu no exato momento do seu nascimento. Ele mostra a posição de cada planeta, o signo ascendente e as casas astrológicas — e como tudo isso se combina para revelar sua personalidade, tendências e potenciais.',
      },
      {
        q: 'O mapa astral é o mesmo que horóscopo?',
        a: 'Não. O horóscopo popular considera apenas o seu signo solar (posição do Sol). O mapa astral é uma análise completa de todos os planetas, signos e casas no momento exato do seu nascimento. É muito mais profundo e pessoal.',
      },
      {
        q: 'Astrologia é uma ciência?',
        a: 'A astrologia é um sistema simbólico milenar de autoconhecimento. Não é ciência no sentido acadêmico, mas é uma ferramenta poderosa de reflexão e autocompreensão, usada por milhões de pessoas ao redor do mundo para se entenderem melhor.',
      },
      {
        q: 'O mapa astral determina meu destino?',
        a: 'Não. O mapa astral revela tendências, talentos naturais e padrões de comportamento — mas você é quem escolhe como agir. Ele é uma ferramenta de autoconhecimento, não um veredicto sobre sua vida.',
      },
    ],
  },
  {
    category: 'Dados e Precisão',
    items: [
      {
        q: 'Preciso saber o horário exato de nascimento?',
        a: 'O horário é fundamental para calcular o Ascendente e as casas astrológicas com precisão. Se não souber o horário, ainda é possível gerar um mapa parcial — mas recomendamos buscar a certidão de nascimento ou perguntar aos pais.',
      },
      {
        q: 'E se eu não souber o horário de nascimento?',
        a: 'Você pode marcar "não sei o horário" no formulário. Elaboramos o mapa sem o Ascendente e as casas, focando nos aspectos planetários — ainda assim é uma leitura muito rica e reveladora.',
      },
      {
        q: 'Por que a cidade de nascimento importa?',
        a: 'A localização geográfica influencia o posicionamento das casas astrológicas e a hora local do nascimento. Dois irmãos nascidos na mesma data, mas em cidades diferentes, terão mapas distintos.',
      },
    ],
  },
  {
    category: 'Processo e Entrega',
    items: [
      {
        q: 'Como funciona o processo após o pedido?',
        a: 'Você preenche o formulário com seus dados. Após a confirmação do pedido, iniciamos a elaboração. Você acompanha o status na sua área do cliente e, quando o mapa estiver pronto, recebe uma notificação para fazer o download em PDF.',
      },
      {
        q: 'Quanto tempo leva para receber meu mapa?',
        a: 'O prazo é de até 5 dias úteis para Mapa Básico, Completo e Revolução Solar. Para Sinastria, até 7 dias úteis — por envolver duas análises completas.',
      },
      {
        q: 'Como recebo o mapa?',
        a: 'O mapa é entregue em PDF na sua área do cliente, onde você pode baixar a qualquer momento. O arquivo fica disponível por tempo indeterminado.',
      },
      {
        q: 'O mapa tem validade? Posso consultar depois?',
        a: 'Seu mapa fica disponível para download na sua área do cliente por tempo indeterminado. O PDF é seu para sempre — salve em um lugar seguro.',
      },
    ],
  },
  {
    category: 'Tipos de Serviço',
    items: [
      {
        q: 'Qual a diferença entre o Mapa Básico e o Completo?',
        a: 'O Mapa Básico cobre Sol, Lua e Ascendente — ótimo para uma primeira leitura. O Mapa Completo analisa todos os dez planetas, as doze casas astrológicas e todos os aspectos entre planetas, resultando em uma interpretação muito mais rica.',
      },
      {
        q: 'O que é Sinastria?',
        a: 'Sinastria é a análise da compatibilidade astrológica entre dois mapas. Ideal para casais, sócios ou qualquer relação significativa. Analisa como os planetas de duas pessoas se relacionam, revelando pontos de harmonia e tensão.',
      },
      {
        q: 'O que é Revolução Solar?',
        a: 'A Revolução Solar é o mapa calculado para o momento em que o Sol retorna à posição exata do seu nascimento (seu aniversário). Ela aponta as tendências, temas e energias predominantes para o ciclo do próximo ano da sua vida.',
      },
    ],
  },
]

export default function FaqPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-14 px-4 text-center">
        <div className="container mx-auto max-w-2xl space-y-4">
          <p className="text-xs font-medium tracking-widest uppercase text-[var(--color-gold)]">
            Dúvidas
          </p>
          <h1 className="font-heading text-5xl font-semibold text-[var(--color-soft-white)]">
            Perguntas frequentes
          </h1>
          <p className="text-[var(--color-soft-white-dim)] leading-relaxed">
            Encontre respostas sobre mapas astrais, processo de entrega e nossos serviços.
          </p>
        </div>
      </section>

      {/* FAQ por categoria */}
      <section className="pb-24 px-4">
        <div className="container mx-auto max-w-3xl space-y-12">
          {FAQ_CATEGORIES.map(({ category, items }) => (
            <div key={category} className="space-y-4">
              {/* Cabeçalho da categoria */}
              <div className="flex items-center gap-4">
                <h2 className="font-heading text-xl font-semibold text-[var(--color-soft-white)] whitespace-nowrap">
                  {category}
                </h2>
                <div className="flex-1 h-px bg-[rgba(201,168,76,0.15)]" />
              </div>

              <Accordion multiple={false} className="space-y-3">
                {items.map((faq, i) => (
                  <AccordionItem
                    key={i}
                    value={i}
                    className="rounded-xl border border-[rgba(201,168,76,0.12)] bg-[rgba(255,255,255,0.02)] px-6 data-[state=open]:border-[rgba(201,168,76,0.35)] data-[state=open]:bg-[rgba(201,168,76,0.04)] transition-colors duration-200"
                  >
                    <AccordionTrigger className="text-left text-[var(--color-soft-white)] hover:text-[var(--color-gold)] hover:no-underline py-5 font-medium">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-[var(--color-soft-white-dim)] text-sm leading-relaxed pb-5">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      </section>

      {/* Ainda tem dúvidas? */}
      <section className="py-16 px-4 border-t border-[rgba(201,168,76,0.1)] text-center">
        <div className="container mx-auto max-w-md space-y-5">
          <h2 className="font-heading text-3xl font-semibold text-[var(--color-soft-white)]">
            Ainda tem dúvidas?
          </h2>
          <p className="text-[var(--color-soft-white-dim)]">
            Entre em contato e respondemos o mais breve possível.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/pedido">
              <Button className="px-8 py-5 bg-[var(--color-gold)] text-[#0e0120] hover:bg-[var(--color-gold-light)] font-semibold">
                Solicitar Meu Mapa
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
