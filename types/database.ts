// ─── Enums ───────────────────────────────────────────────────────────────────

export type UserRole = 'client' | 'admin'

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'in_progress'
  | 'delivered'
  | 'cancelled'

export type ServiceType =
  | 'basic'
  | 'complete'
  | 'synastry'
  | 'solar_return'

// ─── Entities ────────────────────────────────────────────────────────────────

export interface User {
  id: string
  email: string
  full_name: string
  phone?: string
  role: UserRole
  avatar_url?: string
  created_at: string
  updated_at: string
}

export interface BirthData {
  id: string
  order_id: string
  full_name: string
  birth_date: string              // YYYY-MM-DD
  birth_time?: string             // HH:MM
  birth_time_unknown: boolean
  birth_city: string
  birth_country: string
  birth_state?: string
  latitude?: number
  longitude?: number
  timezone?: string
  // Sinastria — segunda pessoa
  partner_full_name?: string
  partner_birth_date?: string
  partner_birth_time?: string
  partner_birth_time_unknown?: boolean
  partner_birth_city?: string
  partner_birth_country?: string
  partner_birth_state?: string
}

export interface AstralChart {
  id: string
  order_id: string
  pdf_storage_path: string
  pdf_filename: string
  pdf_size_bytes: number
  uploaded_by: string
  uploaded_at: string
  download_count: number
  expires_at?: string
}

export interface Order {
  id: string
  user_id: string
  service_type: ServiceType
  status: OrderStatus
  price_cents: number
  notes?: string
  admin_notes?: string
  created_at: string
  updated_at: string
  delivered_at?: string
  // Relações (opcionais — presentes em joins)
  birth_data?: BirthData
  astral_chart?: AstralChart
  user?: User
}

export interface OrderStatusHistory {
  id: string
  order_id: string
  from_status?: OrderStatus
  to_status: OrderStatus
  changed_by: string
  reason?: string
  created_at: string
}

// ─── DTOs ────────────────────────────────────────────────────────────────────

export interface CreateOrderDTO {
  service_type: ServiceType
  notes?: string
  birth_data: Omit<BirthData, 'id' | 'order_id'>
}

export interface UpdateUserDTO {
  full_name?: string
  phone?: string
  avatar_url?: string
}

export interface CreateUserDTO {
  email: string
  full_name: string
  password_hash: string
  role?: UserRole
}

export interface OrderFilters {
  status?: OrderStatus
  service_type?: ServiceType
  user_id?: string
  search?: string
  page?: number
  per_page?: number
}
