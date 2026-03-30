import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { updateProfileSchema } from '@/lib/validations/auth'
import { createUserRepository } from '@/lib/container'

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  const { id } = await params

  if (!session?.user) {
    return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 })
  }

  // Cliente só pode editar o próprio perfil
  if (session.user.id !== id && session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Acesso negado.' }, { status: 403 })
  }

  const body = await req.json().catch(() => null)
  const parsed = updateProfileSchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json({ error: 'Dados inválidos.' }, { status: 400 })
  }

  const userRepo = createUserRepository()
  const updated = await userRepo.update(id, parsed.data)

  return NextResponse.json(updated)
}
