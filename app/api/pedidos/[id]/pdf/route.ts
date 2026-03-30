import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { createOrderService } from '@/lib/container'
import { NotFoundError, ForbiddenError } from '@/lib/services/order.service'

const MAX_SIZE = 20 * 1024 * 1024 // 20MB

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 })
  if (session.user.role !== 'admin') return NextResponse.json({ error: 'Acesso negado.' }, { status: 403 })

  const { id } = await params

  const formData = await req.formData().catch(() => null)
  const file = formData?.get('file') as File | null

  if (!file) return NextResponse.json({ error: 'Arquivo não enviado.' }, { status: 400 })
  if (file.type !== 'application/pdf') return NextResponse.json({ error: 'Apenas PDFs são aceitos.' }, { status: 400 })
  if (file.size > MAX_SIZE) return NextResponse.json({ error: 'Arquivo excede 20MB.' }, { status: 413 })

  // TODO Fase 6: fazer upload real para o Supabase Storage
  // Por ora retorna sucesso simulado e atualiza o status para 'delivered'
  const orderService = createOrderService()
  try {
    await orderService.updateStatus(id, 'delivered', session.user.id)
    return NextResponse.json({ ok: true, filename: file.name })
  } catch (err) {
    if (err instanceof NotFoundError) return NextResponse.json({ error: err.message }, { status: 404 })
    return NextResponse.json({ error: 'Erro interno.' }, { status: 500 })
  }
}

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 })

  const { id } = await params
  const orderService = createOrderService()

  try {
    const order = await orderService.getOrder(id, session.user.id, session.user.role === 'admin')
    if (!order.astral_chart) {
      return NextResponse.json({ error: 'PDF não disponível.' }, { status: 404 })
    }
    // TODO Fase 6: gerar signed URL do Supabase Storage e redirecionar
    return NextResponse.json({ url: order.astral_chart.pdf_storage_path })
  } catch (err) {
    if (err instanceof NotFoundError) return NextResponse.json({ error: err.message }, { status: 404 })
    if (err instanceof ForbiddenError) return NextResponse.json({ error: err.message }, { status: 403 })
    return NextResponse.json({ error: 'Erro interno.' }, { status: 500 })
  }
}
