import { model, Schema } from 'mongoose'

import { IPhone } from '../../interfaces/phone.interface'

export const phoneSchema: Schema = new Schema<IPhone>({
  code: {
    type: String,
    required: true,
  },
  number: {
    type: String,
    required: true,
  },
})
