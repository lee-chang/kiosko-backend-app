export interface IBalance {
  id: string
  
  customer: string // -> customer id

  paymenent: string[] // -> payment id
  credit: string[]  // -> credit id

  total: number

  createdAt: Date
  updatedAt: Date
}