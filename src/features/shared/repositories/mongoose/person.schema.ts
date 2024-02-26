import { model, Schema } from 'mongoose'
import { IPerson } from '../../interfaces/person.interface'
import { phoneSchema } from './phone.schema'
import { addressSchema } from './address.schema'

export const PersonSchema = new Schema<IPerson>({
  identificationType: {
    type: String,
    trim: true,
  },
  identification: {
    type: String,
    trim: true,
  },
  name: {
    type: String,
    trim: true,
  },
  phone: [
    {
      type: phoneSchema,
    },
  ],
  address: [
    {
      type: addressSchema,
    },
  ],

})