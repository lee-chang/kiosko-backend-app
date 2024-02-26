import z from 'zod'
import { IAddress } from '../interfaces/address.interface'

export const addressSchema = z.object({
  country: z.string().min(3).max(255),
  state: z.string().min(3).max(255),
  city: z.string().min(3).max(255),
  address: z.string().min(3).max(255),
  reference: z.string().min(3).max(255).optional(),
}) satisfies z.ZodType<IAddress>
