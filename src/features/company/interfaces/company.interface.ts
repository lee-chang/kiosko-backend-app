export interface ICompany {
  id: string
  name: string
  verified: boolean
  admin: string
  staff: string[]
  credit_total: number
  payment_total: number
  createdAt?: Date
  updatedAt?: Date
}

