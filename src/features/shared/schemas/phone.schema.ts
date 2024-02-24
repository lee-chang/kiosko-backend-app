import z from 'zod'
import { IPhone } from '../interfaces/phone.interface'

export const phoneSchema = z.object({
  // Numeros de telefono
  code: z.number(),
  number: z.number()
}) satisfies z.ZodType<IPhone>
