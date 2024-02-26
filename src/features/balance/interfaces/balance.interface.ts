export interface IBalance {
  id: string
  
  payment: string[] // -> payment id
  credit: string[]  // -> credit id

  total: number

  createdAt?: Date
  updatedAt?: Date
}