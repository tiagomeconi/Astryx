import type { ServiceType, OrderStatus } from '@/types/database'

// ─── Preços (em centavos) ────────────────────────────────────────────────────
export const PRICE_TABLE: Record<ServiceType, number> = {
  basic: 9700,          // R$ 97,00
  complete: 19700,      // R$ 197,00
  synastry: 24700,      // R$ 247,00
  solar_return: 14700,  // R$ 147,00
}

// ─── Labels dos serviços ─────────────────────────────────────────────────────
export const SERVICE_LABELS: Record<ServiceType, string> = {
  basic: 'Mapa Astral Básico',
  complete: 'Mapa Astral Completo',
  synastry: 'Sinastria',
  solar_return: 'Revolução Solar',
}

export const SERVICE_DESCRIPTIONS: Record<ServiceType, string> = {
  basic: 'Análise do seu Sol, Lua e Ascendente com interpretação detalhada dos aspectos principais.',
  complete: 'Interpretação completa de todos os planetas, casas e aspectos. O retrato mais fiel da sua essência.',
  synastry: 'Compatibilidade astrológica entre dois mapas. Ideal para casais, sócios e relações importantes.',
  solar_return: 'Previsão para o seu próximo ano solar. Tendências, desafios e oportunidades do ciclo.',
}

// ─── Labels de status ────────────────────────────────────────────────────────
export const STATUS_LABELS: Record<OrderStatus, string> = {
  pending: 'Aguardando',
  confirmed: 'Confirmado',
  in_progress: 'Em Produção',
  delivered: 'Entregue',
  cancelled: 'Cancelado',
}

export const STATUS_COLORS: Record<OrderStatus, string> = {
  pending: 'text-yellow-400 bg-yellow-400/10',
  confirmed: 'text-blue-400 bg-blue-400/10',
  in_progress: 'text-indigo-400 bg-indigo-400/10',
  delivered: 'text-emerald-400 bg-emerald-400/10',
  cancelled: 'text-red-400 bg-red-400/10',
}

// ─── Steps do formulário de pedido ──────────────────────────────────────────
export const ORDER_STEPS = [
  { id: 1, label: 'Serviço' },
  { id: 2, label: 'Dados' },
  { id: 3, label: 'Revisão' },
] as const
