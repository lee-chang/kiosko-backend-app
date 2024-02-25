export interface IBalance {
  id: string
  
  customer: string // -> customer id

  payment: string[] // -> payment id
  credit: string[]  // -> credit id

  total: number

  createdAt?: Date
  updatedAt?: Date
}