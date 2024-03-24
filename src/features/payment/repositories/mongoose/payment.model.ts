import { Schema, model, Types } from 'mongoose'
import { IPayment } from '../../interfaces/payment.interface'
import { UuidGenerator } from '../../../../core/utils/UuidGenerator.util'
const paymentSchema: Schema = new Schema<IPayment & { _id: string }>(
  {
    _id: {
      type: String,
    },
    id: {
      type: String,
      unique: true,
      key: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    method: {
      type: String,
      required: true,
    },

    customer: {
      type: String,
      ref: 'Customer',
      required: true,
    },
    staff: {
      type: String,
      ref: 'User',
      required: true,
    },
    balance: {
      type: String,
      ref: 'Balance',
      required: true,
    },
    observation: {
      type: String,
    },
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

paymentSchema.pre('save', async function (next) {
  // Crea un id de ira
  const uuid = new UuidGenerator().generate()

  // Asigna el id de ira a los atributos _id e id
  this._id = uuid
  this.id = uuid

  // Continúa con el proceso de guardado
  next()
})

export const PaymentModel = model<IPayment>('Payment', paymentSchema)
