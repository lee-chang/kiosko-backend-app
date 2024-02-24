import { ICustomer } from '../../interfaces/customer.interface'
import { UuidGenerator } from '../../../../core/utils/UuidGenerator.util'
import { model, Schema } from 'mongoose'

import { phoneSchema } from '../../../shared/repositories/mongoose/phone.model'
import { addressSchema } from '../../../shared/repositories/mongoose/address.model'

const CustomerSchema: Schema = new Schema<ICustomer & { _id: string }>(
  {
    _id: {
      type: String,
    },
    id: {
      type: String,
      unique: true,
      key: true,
    },
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
  },
  {
    id: true,
    toJSON: {
      transform(doc, ret) {
        delete ret._id
      },
    },
    timestamps: true,
    versionKey: false,
  }
)

CustomerSchema.pre('save', async function (next) {
  // Crea un id de ira
  const uuid = new UuidGenerator().generate()

  // Asigna el id de ira a los atributos _id e id
  this._id = uuid
  this.id = uuid

  // Continúa con el proceso de guardado
  next()
})

const CustomerModel = model<ICustomer>('Customer', CustomerSchema)
export default CustomerModel
