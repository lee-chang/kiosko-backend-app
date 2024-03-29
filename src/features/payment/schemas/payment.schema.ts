import z from 'zod'
import { IPayment, PaymentMethod, PaymentStatus } from '../interfaces/payment.interface'

// Hacer uso de la interfaz IUser
const paymentSchema = z.object({
  id: z.string(),

  amount: z.number(),
  status: z.nativeEnum(PaymentStatus),
  method: z.nativeEnum(PaymentMethod),

  staff: z.string(),
  customer: z.string(),
  balance: z.string(),

  observation: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
}) satisfies z.ZodType<IPayment>

export const PaymentSchema = {
  Create: paymentSchema.omit({ id: true, createdAt: true, updatedAt: true }),
  Update: paymentSchema.partial().omit({ id: true, createdAt: true, updatedAt: true }),
}
