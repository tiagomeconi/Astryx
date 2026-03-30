import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { z } from 'zod'
import { createOrderService } from '@/lib/container'
import { NotFoundError, ForbiddenError } from '@/lib/services/order.service'
import type { OrderStatus } from '@/types/database'

const patchSchema = z.object({
  status: z.enum(['pending', 'confirmed', 'in_progress', 'delivered', 'cancelled']).optional(),
  admin_notes: z.string().max(1000).optional(),
})

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 })

  const { id } = await params
  const orderService = createOrderService()

  try {
    const order = await orderService.getOrder(id, session.user.id, session.user.role === 'admin')
    return NextResponse.json(order)
  } catch (err) {
    if (err instanceof NotFoundError) return NextResponse.json({ error: err.message }, { status: 404 })
    if (err instanceof ForbiddenError) return NextResponse.json({ error: err.message }, { status: 403 })
    return NextResponse.json({ error: 'Erro interno.' }, { status: 500 })
  }
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 })
  if (session.user.role !== 'admin') return NextResponse.json({ error: 'Acesso negado.' }, { status: 403 })

  const { id } = await params
  const body = await req.json().catch(() => null)
  const parsed = patchSchema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: 'Dados inválidos.' }, { status: 400 })

  const orderService = createOrderService()

  try {
    let order
    if (parsed.data.status) {
      order = await orderService.updateStatus(id, parsed.data.status as OrderStatus, session.user.id)
    }
    if (parsed.data.admin_notes !== undefined) {
      order = await orderService.updateAdminNotes(id, parsed.data.admin_notes)
    }
    return NextResponse.json(order)
  } catch (err) {
    if (err instanceof NotFoundError) return NextResponse.json({ error: err.message }, { status: 404 })
    return NextResponse.json({ error: 'Erro interno.' }, { status: 500 })
  }
}
