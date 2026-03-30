import type { IOrderRepository, IMailService } from '@/lib/repositories/interfaces'
import type { Order, CreateOrderDTO, OrderStatus } from '@/types/database'
import { PRICE_TABLE } from '@/constants/services'

export class OrderService {
  constructor(
    private readonly orders: IOrderRepository,
    private readonly mailer: IMailService,
  ) {}

  async getOrder(id: string, requestingUserId: string, isAdmin: boolean): Promise<Order> {
    const order = await this.orders.findById(id)
    if (!order) throw new NotFoundError(`Pedido ${id} não encontrado`)
    if (!isAdmin && order.user_id !== requestingUserId) {
      throw new ForbiddenError('Acesso negado')
    }
    return order
  }

  async getUserOrders(userId: string): Promise<Order[]> {
    return this.orders.findByUserId(userId)
  }

  async getAllOrders(filters?: Parameters<IOrderRepository['findAll']>[0]): Promise<Order[]> {
    return this.orders.findAll(filters)
  }

  async createOrder(userId: string, data: CreateOrderDTO): Promise<Order> {
    const price = PRICE_TABLE[data.service_type]
    if (!price) throw new BusinessError('Tipo de serviço inválido')

    if (data.service_type === 'synastry') {
      if (!data.birth_data.partner_full_name || !data.birth_data.partner_birth_date) {
        throw new BusinessError('Sinastria requer os dados do parceiro(a)')
      }
    }

    const order = await this.orders.create(userId, data, price)
    // Fire-and-forget — falhas de e-mail não devem quebrar o pedido
    this.mailer.sendOrderConfirmation(order).catch((err) => {
      console.error('[OrderService] Falha ao enviar e-mail de confirmação:', err)
    })
    return order
  }

  async updateStatus(
    orderId: string,
    newStatus: OrderStatus,
    adminId: string,
    reason?: string,
  ): Promise<Order> {
    const order = await this.orders.findById(orderId)
    if (!order) throw new NotFoundError(`Pedido ${orderId} não encontrado`)

    const updated = await this.orders.updateStatus(orderId, newStatus, adminId, reason)

    if (newStatus === 'delivered') {
      this.mailer.sendDeliveryNotification(updated).catch((err) => {
        console.error('[OrderService] Falha ao enviar e-mail de entrega:', err)
      })
    }

    return updated
  }

  async updateAdminNotes(orderId: string, notes: string): Promise<Order> {
    const order = await this.orders.findById(orderId)
    if (!order) throw new NotFoundError(`Pedido ${orderId} não encontrado`)
    return this.orders.updateAdminNotes(orderId, notes)
  }
}

// ─── Erros de domínio ────────────────────────────────────────────────────────

export class BusinessError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'BusinessError'
  }
}

export class NotFoundError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'NotFoundError'
  }
}

export class ForbiddenError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ForbiddenError'
  }
}
