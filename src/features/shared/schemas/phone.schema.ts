import z from 'zod'
import { IPhone } from '../interfaces/phone.interface'

export const phoneSchema = z.object({
  // Numeros de telefono
  code: z.string(),
  number: z.string()
}) satisfies z.ZodType<IPhone>
