import { z } from 'zod'

export const birthDataSchema = z.object({
  full_name: z.string().min(2, 'Nome deve ter ao menos 2 caracteres').max(100),
  birth_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Data inválida (YYYY-MM-DD)'),
  birth_time: z.string().regex(/^\d{2}:\d{2}$/, 'Horário inválido (HH:MM)').optional(),
  birth_time_unknown: z.boolean(),
  birth_city: z.string().min(2, 'Cidade obrigatória').max(100),
  birth_state: z.string().max(100).optional(),
  birth_country: z.string().min(2, 'País obrigatório').max(100),
  // Parceiro (sinastria)
  partner_full_name: z.string().min(2).max(100).optional(),
  partner_birth_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  partner_birth_time: z.string().regex(/^\d{2}:\d{2}$/).optional(),
  partner_birth_time_unknown: z.boolean().optional(),
  partner_birth_city: z.string().max(100).optional(),
  partner_birth_state: z.string().max(100).optional(),
  partner_birth_country: z.string().max(100).optional(),
})

export const createOrderSchema = z.object({
  service_type: z.enum(['basic', 'complete', 'synastry', 'solar_return']),
  notes: z.string().max(500).optional(),
  birth_data: birthDataSchema,
})

export type CreateOrderInput = z.infer<typeof createOrderSchema>
export type BirthDataInput = z.infer<typeof birthDataSchema>
