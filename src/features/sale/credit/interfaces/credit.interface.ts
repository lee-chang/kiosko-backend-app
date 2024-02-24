import { IProductSale, ISale } from "../../interfaces/sale.interface";

export interface ISaleCredit {
  id: string

  order: string // -> order id

  createdAt: Date
  updatedAt: Date
}

