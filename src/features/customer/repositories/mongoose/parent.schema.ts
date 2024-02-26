import { Schema } from 'mongoose'
import { addressSchema } from '../../../shared/repositories/mongoose/address.schema'
import { phoneSchema } from '../../../shared/repositories/mongoose/phone.schema'
import { IParent } from '../../interfaces/customer.interface'

export const ParentSchema = new Schema<IParent>({
  isParent: { type: Boolean },
  child: [
    {
      // PersonSchema
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

      // StudentSchema
      level: {
        type: String,
      },
      grade: {
        type: Number,
      },
      section: {
        type: String,
      },
    },
  ],
})
