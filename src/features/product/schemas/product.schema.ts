import z from 'zod'
import { IProduct } from '../interfaces/product.interface'

// Hacer uso de la interfaz IUser
const productSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  reference_price: z.number(),
  image: z.object({
    secure_url: z.string(),
    public_id: z.string(),
  }).optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
}) satisfies z.ZodType<IProduct>

export const ProductSchema = {
  Create: productSchema.omit({ id: true, createdAt: true, updatedAt: true }),
  Update: productSchema.pick({ name: true }),
}
