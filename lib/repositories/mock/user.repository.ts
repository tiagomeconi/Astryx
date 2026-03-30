import type { IUserRepository } from '../interfaces'
import type { User, CreateUserDTO, UpdateUserDTO } from '@/types/database'

const MOCK_USERS: (User & { password_hash: string })[] = [
  {
    id: 'user-1',
    email: 'cliente@exemplo.com',
    full_name: 'Maria Silva',
    role: 'client',
    password_hash: '$2b$12$placeholder',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'admin-1',
    email: 'admin@astryx.com.br',
    full_name: 'Admin Astryx',
    role: 'admin',
    password_hash: '$2b$12$placeholder',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

export class MockUserRepository implements IUserRepository {
  private users = [...MOCK_USERS]

  async findById(id: string): Promise<User | null> {
    const u = this.users.find((u) => u.id === id)
    if (!u) return null
    const { password_hash: _, ...user } = u
    return user
  }

  async findByEmail(email: string): Promise<User | null> {
    const u = this.users.find((u) => u.email === email)
    if (!u) return null
    const { password_hash: _, ...user } = u
    return user
  }

  async create(data: CreateUserDTO): Promise<User> {
    const newUser = {
      id: `user-${Date.now()}`,
      email: data.email,
      full_name: data.full_name,
      role: data.role ?? 'client' as const,
      password_hash: data.password_hash,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
    this.users.push(newUser)
    const { password_hash: _, ...user } = newUser
    return user
  }

  async update(id: string, data: UpdateUserDTO): Promise<User> {
    const idx = this.users.findIndex((u) => u.id === id)
    if (idx === -1) throw new Error(`Usuário ${id} não encontrado`)
    this.users[idx] = { ...this.users[idx], ...data, updated_at: new Date().toISOString() }
    const { password_hash: _, ...user } = this.users[idx]
    return user
  }
}
