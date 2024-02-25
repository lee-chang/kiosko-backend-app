
export interface ICredit {
  id: string

  order: string // -> order id
  
  customer: string // -> customer id
  
  status: CreditStatus
  amount: number; // Monto del crédito
  staff: string // -> staff id

  observation?: string
  createdAt?: Date
  updatedAt?: Date
}

export enum CreditStatus {
  PENDING = 'Pendiente',
  APPROVED = 'Aprobado',
  REJECTED = 'Rechazado',
  CANCELED = 'Cancelado',
}