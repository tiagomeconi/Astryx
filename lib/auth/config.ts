import type { NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { createUserRepository } from '@/lib/container'
import { loginSchema } from '@/lib/validations/auth'

// Repositório de usuários (singleton para o processo — não instancia por request aqui)
const userRepo = createUserRepository()

export const authConfig: NextAuthConfig = {
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'E-mail', type: 'email' },
        password: { label: 'Senha', type: 'password' },
      },
      async authorize(credentials) {
        const parsed = loginSchema.safeParse(credentials)
        if (!parsed.success) return null

        // TODO: quando migrar ao Supabase, buscar com password_hash incluso
        const user = await userRepo.findByEmail(parsed.data.email)
        if (!user) return null

        // Nota: no mock o hash é placeholder — em produção verificar com bcrypt
        // const valid = await bcrypt.compare(parsed.data.password, user.password_hash)
        // if (!valid) return null

        return {
          id: user.id,
          email: user.email,
          name: user.full_name,
          role: user.role,
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = (user as { role?: string }).role
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
        session.user.role = token.role as string
      }
      return session
    },
  },

  pages: {
    signIn: '/login',
    error: '/login',
  },

  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 dias
  },
}
