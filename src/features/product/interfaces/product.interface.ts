export interface IProduct {
  id: string
  name: string
  description: string
  reference_price: number
  image?: string
  createdAt?: Date
  updatedAt?: Date
}