import z from 'zod'
import { IPerson, IdentificationType } from '../interfaces/person.interface'
import { phoneSchema } from './phone.schema'
import { addressSchema } from './address.schema'

export const personSchema = z.object({
  name: z.string(),
  identificationType: z.nativeEnum(IdentificationType).optional(),
  identification: z.string().optional(),
  phone: z.array(phoneSchema).optional(),
  address: z.array(addressSchema).optional(),
}) satisfies z.ZodType<IPerson>
