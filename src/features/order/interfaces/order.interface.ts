import { IProduct } from '../../product/interfaces/product.interface'

export interface IProductSale {

  product: string // -> product id
  
  quantity: number
  price: number
  total: number
}

export interface IOrder {
  id: string
  
  credit?: string // -> credit id
  
  customer: string // -> customer id
  staff: string // -> staff id
  total_amount: number
  
  status: OrderStatus
  products: IProductSale[]


  observation?: string

  createdAt?: Date
  updatedAt?: Date
}


export enum OrderStatus {
  PENDING = 'Pendiente',
  IN_PROCESS = 'En Proceso',
  COMPLETED = 'Completada',
  CANCELED = 'Cancelada',
  REFUNDED = 'Reembolsada',
}

