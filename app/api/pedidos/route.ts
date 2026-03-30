import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { createOrderSchema } from '@/lib/validations/order'
import { createOrderService } from '@/lib/container'
import { BusinessError } from '@/lib/services/order.service'
import type { OrderStatus } from '@/types/database'

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ error: 'Não autorizado. Faça login para continuar.' }, { status: 401 })
  }

  const body = await req.json().catch(() => null)
  const parsed = createOrderSchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json({ error: 'Dados inválidos.', details: parsed.error.flatten() }, { status: 400 })
  }

  try {
    const orderService = createOrderService()
    const order = await orderService.createOrder(session.user.id, parsed.data)
    return NextResponse.json(order, { status: 201 })
  } catch (err) {
    if (err instanceof BusinessError) {
      return NextResponse.json({ error: err.message }, { status: 422 })
    }
    console.error('[POST /api/pedidos]', err)
    return NextResponse.json({ error: 'Erro interno.' }, { status: 500 })
  }
}

export async function GET(req: Request) {
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 })
  }

  const orderService = createOrderService()

  if (session.user.role === 'admin') {
    const { searchParams } = new URL(req.url)
    const status = searchParams.get('status') as OrderStatus | null
    const orders = await orderService.getAllOrders(status ? { status } : undefined)
    return NextResponse.json(orders)
  }

  const orders = await orderService.getUserOrders(session.user.id)
  return NextResponse.json(orders)
}
