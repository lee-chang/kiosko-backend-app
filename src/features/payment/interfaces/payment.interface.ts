export interface IPayment {
  id: string
  amount: number
  status: boolean // true: aprovated, false: cancelled
  method: PaymentMethod
  staff: string // -> staff id
  observation?: string
  createdAt?: Date
  updatedAt?: Date
}

export enum PaymentMethod {
  YAPE = 'YAPE',
  TUNKI = 'TUNKI',
  PLIM = 'PLIM',
  TRANSFER = 'TRANSFER',
  CREDIT_CARD = 'CREDIT_CARD',
  CASH = 'CASH'
}
