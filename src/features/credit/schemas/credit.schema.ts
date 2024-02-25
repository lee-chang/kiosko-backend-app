import z from 'zod'
import { CreditStatus, ICredit } from '../interfaces/credit.interface'

// Hacer uso de la interfaz IUser
const creditSchema = z.object({
  id: z.string(),

  order: z.string(),
  customer: z.string(),
  staff: z.string(),
  status: z.nativeEnum(CreditStatus),
  amount: z.number(),

  observation: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
}) satisfies z.ZodType<ICredit>

export const CreditSchema = {
  Create: creditSchema.omit({ id: true, createdAt: true, updatedAt: true }),
  Update: creditSchema.partial().omit({ id: true, createdAt: true, updatedAt: true }),
}
