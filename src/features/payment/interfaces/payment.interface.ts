export interface IPayment {
  id: string

  amount: number
  status: PaymentStatus // true: aprovated, false: rejected
  method: PaymentMethod

  staff: string // -> staff id
  customer: string // -> customer id
  balance: string // -> balance id
  
  observation?: string
  createdAt?: Date
  updatedAt?: Date
}

export enum PaymentMethod {
  YAPE = 'Yape',
  TUNKI = 'Tunki',
  PLIM = 'Plim',
  TRANSFER = 'Transferencia bancaria',
  CREDIT_CARD = 'Tarjeta de crédito',
  CASH = 'Efectivo',
}

export enum PaymentStatus {
  PENDING = 'Pendiente',
  APPROVED = 'Aprobado',
  REJECTED = 'Rechazado',
  CANCELED = 'Cancelado',
}