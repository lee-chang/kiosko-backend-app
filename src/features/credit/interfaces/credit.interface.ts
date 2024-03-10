
export interface IProductSale {

  product: string // -> product id
  
  quantity: number
  price: number
  total: number
}

export interface ICredit {
  id: string
  
  balance: string // -> balance id
  customer: string // -> customer id
  staff: string // -> staff id
  
  amount: number; // Monto del crédito
  
  status: CreditStatus
  products: IProductSale[]

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