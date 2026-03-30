import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const FAQS = [
  {
    q: 'O que é um mapa astral?',
    a: 'O mapa astral é um retrato do céu no exato momento do seu nascimento. Ele mostra a posição de cada planeta, o signo ascendente e as casas astrológicas — e como tudo isso se combina para revelar sua personalidade, tendências e potenciais.',
  },
  {
    q: 'Preciso saber o horário exato de nascimento?',
    a: 'O horário é fundamental para calcular o Ascendente e as casas astrológicas com precisão. Se não souber o horário, ainda é possível gerar um mapa parcial — mas indicamos buscar a certidão de nascimento ou perguntar aos pais, pois faz grande diferença na leitura.',
  },
  {
    q: 'Como funciona o processo após o pedido?',
    a: 'Você preenche o formulário com seus dados, realizamos o pagamento e iniciamos a elaboração do seu mapa. Você acompanha o status na sua área do cliente e, quando o mapa estiver pronto, recebe uma notificação e pode fazer o download em PDF.',
  },
  {
    q: 'Quanto tempo leva para receber meu mapa?',
    a: 'O prazo é de até 5 dias úteis após a confirmação do pedido. Mapas de Sinastria podem levar até 7 dias úteis por envolverem duas análises completas.',
  },
  {
    q: 'O que diferencia o Mapa Básico do Mapa Completo?',
    a: 'O Mapa Básico cobre Sol, Lua e Ascendente — ótimo para uma primeira leitura. O Mapa Completo analisa todos os dez planetas, as doze casas astrológicas e todos os aspectos entre planetas, resultando em uma interpretação muito mais rica e aprofundada.',
  },
  {
    q: 'O mapa tem validade? Posso consultar depois?',
    a: 'Seu mapa fica disponível para download na sua área do cliente por tempo indeterminado. O PDF é seu para sempre — salve em um lugar seguro.',
  },
  {
    q: 'Astrologia é uma ciência?',
    a: 'A astrologia é um sistema simbólico milenar de autoconhecimento. Não é ciência no sentido acadêmico, mas é uma ferramenta poderosa de reflexão e autocompreensão, usada por milhões de pessoas ao redor do mundo para se entenderem melhor.',
  },
]

export function FaqSection() {
  return (
    <section className="relative z-10 py-24 px-4">
      <div className="container mx-auto max-w-3xl">
        {/* Header */}
        <div className="text-center mb-14 space-y-4">
          <p className="text-xs font-medium tracking-widest uppercase text-[var(--color-gold)]">
            Dúvidas Frequentes
          </p>
          <h2 className="font-heading text-4xl md:text-5xl font-semibold text-[var(--color-soft-white)]">
            Perguntas frequentes
          </h2>
        </div>

        <Accordion multiple={false} className="space-y-3">
          {FAQS.map((faq, i) => (
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
    </section>
  )
}
