import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { z } from 'zod'
import { createUserRepository } from '@/lib/container'

const schema = z.object({
  full_name: z.string().min(2).max(100),
  email: z.string().email(),
  password: z.string().min(8),
})

export async function POST(req: Request) {
  const body = await req.json().catch(() => null)
  const parsed = schema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json({ error: 'Dados inválidos.' }, { status: 400 })
  }

  const { full_name, email, password } = parsed.data
  const userRepo = createUserRepository()

  const existing = await userRepo.findByEmail(email)
  if (existing) {
    return NextResponse.json({ error: 'Este e-mail já está cadastrado.' }, { status: 409 })
  }

  const password_hash = await bcrypt.hash(password, 12)
  await userRepo.create({ full_name, email, password_hash, role: 'client' })

  return NextResponse.json({ ok: true }, { status: 201 })
}
