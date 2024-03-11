export interface IProduct {
  id: string
  name: string
  description: string
  reference_price: number,
  category?: string
  image?: {
    secure_url: string,
    public_id: string
  }
  createdAt?: Date
  updatedAt?: Date
}