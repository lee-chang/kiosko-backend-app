import { IProduct } from "../../product/interfaces/product.interface"

export interface IProductSale extends IProduct {
  quantity: number
  price: number
  total: number
}


export interface ISale {
  products: IProductSale[]

  total: number

  customer: string // -> customer id
  staff: string // -> staff id

  status: boolean // true: success, false: cancelled or rejected 
}