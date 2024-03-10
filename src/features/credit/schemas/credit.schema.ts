import z from 'zod'
import { CreditStatus, ICredit, IProductSale } from '../interfaces/credit.interface'

const productSaleSchema = z.object({
  product: z.string(),
  quantity: z.number(),
  price: z.number(),
  total: z.number(),
}) satisfies z.ZodType<IProductSale> 


// Hacer uso de la interfaz IUser
const creditSchema = z.object({
  id: z.string(),

  // order: z.string(),
  balance: z.string(),
  staff: z.string(),
  customer: z.string(),
  amount: z.number(),
  products: z.array(productSaleSchema),
  status: z.nativeEnum(CreditStatus),
  observation: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
}) satisfies z.ZodType<ICredit>

export const CreditSchema = {
  Create: creditSchema.omit({ id: true, createdAt: true, updatedAt: true }),
  Update: creditSchema.partial().omit({ id: true, createdAt: true, updatedAt: true }),
}
