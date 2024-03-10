import z from 'zod'
import { IBalance } from '../interfaces/balance.interface'

// Hacer uso de la interfaz IUser
const balanceSchema = z.object({
  id: z.string(),


  customer: z.string(),
  
  payment: z.array(z.string()),
  credit: z.array(z.string()),

  total_credit: z.number().optional(),
  total_payment: z.number().optional(),
  total: z.number().optional(),

  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
}) satisfies z.ZodType<IBalance>

export const BalanceSchema = {
  Create: balanceSchema.omit({ id: true }),
  Update: balanceSchema.partial().omit({ id: true, createdAt: true, updatedAt: true }),
}
