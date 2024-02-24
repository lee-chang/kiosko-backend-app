import { IProductSale, ISale } from "../../interfaces/sale.interface";

export interface ISaleOrder extends ISale {
  id: string

  credit: string // -> credit id

  createdAt: Date
  updatedAt: Date
}