import type { IMailService } from '../interfaces'
import type { Order } from '@/types/database'

/** Implementação noop — loga no console durante o desenvolvimento. */
export class NoopMailService implements IMailService {
  async sendOrderConfirmation(order: Order): Promise<void> {
    console.log(`[Mail] Confirmação de pedido enviada para pedido ${order.id}`)
  }

  async sendDeliveryNotification(order: Order): Promise<void> {
    console.log(`[Mail] Notificação de entrega enviada para pedido ${order.id}`)
  }

  async sendPasswordReset(email: string, token: string): Promise<void> {
    console.log(`[Mail] Reset de senha para ${email} — token: ${token}`)
  }
}
