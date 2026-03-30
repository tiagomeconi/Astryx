/**
 * Implementação mock do IOrderRepository.
 * Usada durante o desenvolvimento antes da integração com Supabase.
 * Para trocar: substitua no container.ts por SupabaseOrderRepository.
 */
import type { IOrderRepository } from '../interfaces'
import type { Order, OrderFilters, CreateOrderDTO, OrderStatus } from '@/types/database'
import { PRICE_TABLE } from '@/constants/services'

const MOCK_ORDERS: Order[] = [
  {
    id: 'order-1',
    user_id: 'user-1',
    service_type: 'complete',
    status: 'delivered',
    price_cents: PRICE_TABLE.complete,
    created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date().toISOString(),
    delivered_at: new Date().toISOString(),
    birth_data: {
      id: 'bd-1',
      order_id: 'order-1',
      full_name: 'Maria Silva',
      birth_date: '1990-03-15',
      birth_time: '14:30',
      birth_time_unknown: false,
      birth_city: 'São Paulo',
      birth_state: 'SP',
      birth_country: 'Brasil',
    },
  },
  {
    id: 'order-2',
    user_id: 'user-1',
    service_type: 'basic',
    status: 'in_progress',
    price_cents: PRICE_TABLE.basic,
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date().toISOString(),
    birth_data: {
      id: 'bd-2',
      order_id: 'order-2',
      full_name: 'Maria Silva',
      birth_date: '1990-03-15',
      birth_time_unknown: true,
      birth_city: 'Rio de Janeiro',
      birth_state: 'RJ',
      birth_country: 'Brasil',
    },
  },
]

export class MockOrderRepository implements IOrderRepository {
  private orders = [...MOCK_ORDERS]

  async findById(id: string): Promise<Order | null> {
    return this.orders.find((o) => o.id === id) ?? null
  }

  async findByUserId(userId: string): Promise<Order[]> {
    return this.orders
      .filter((o) => o.user_id === userId)
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
  }

  async findAll(filters?: OrderFilters): Promise<Order[]> {
    let result = [...this.orders]
    if (filters?.status) result = result.filter((o) => o.status === filters.status)
    if (filters?.service_type) result = result.filter((o) => o.service_type === filters.service_type)
    if (filters?.user_id) result = result.filter((o) => o.user_id === filters.user_id)
    return result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
  }

  async count(filters?: OrderFilters): Promise<number> {
    return (await this.findAll(filters)).length
  }

  async create(userId: string, data: CreateOrderDTO, priceCents: number): Promise<Order> {
    const order: Order = {
      id: `order-${Date.now()}`,
      user_id: userId,
      service_type: data.service_type,
      status: 'pending',
      price_cents: priceCents,
      notes: data.notes,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      birth_data: {
        id: `bd-${Date.now()}`,
        order_id: `order-${Date.now()}`,
        ...data.birth_data,
      },
    }
    this.orders.push(order)
    return order
  }

  async updateStatus(id: string, status: OrderStatus, _adminId: string): Promise<Order> {
    const idx = this.orders.findIndex((o) => o.id === id)
    if (idx === -1) throw new Error(`Pedido ${id} não encontrado`)
    this.orders[idx] = {
      ...this.orders[idx],
      status,
      updated_at: new Date().toISOString(),
      ...(status === 'delivered' ? { delivered_at: new Date().toISOString() } : {}),
    }
    return this.orders[idx]
  }

  async updateAdminNotes(id: string, notes: string): Promise<Order> {
    const idx = this.orders.findIndex((o) => o.id === id)
    if (idx === -1) throw new Error(`Pedido ${id} não encontrado`)
    this.orders[idx] = { ...this.orders[idx], admin_notes: notes, updated_at: new Date().toISOString() }
    return this.orders[idx]
  }
}
