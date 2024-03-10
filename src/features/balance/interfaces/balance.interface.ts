export interface IBalance {
  id: string
  
  payment: string[] // -> payment id
  credit: string[]  // -> credit id
  customer: string // -> customer id

  total_credit?: number
  total_payment?: number
  total?: number

  createdAt?: Date
  updatedAt?: Date
}