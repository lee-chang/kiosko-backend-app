import { Schema, model, Types } from 'mongoose'
import { IBalance } from '../../interfaces/balance.interface'
import { UuidGenerator } from '../../../../core/utils/UuidGenerator.util'
const balanceSchema: Schema = new Schema<IBalance & { _id: string }>(
  {
    _id: {
      type: String,
    },
    id: {
      type: String,
      unique: true,
      key: true,
    },

    payment: [
      {
        type: String,
        ref: 'Payment',
      },
    ],
    customer: {
      type: String,
      ref: 'Customer',
    },
    credit: [
      {
        type: String,
        ref: 'Credit',
      },
    ],
    total_credit: {
      type: Number,
    },
    total_payment: {
      type: Number,
    },
    total: {
      type: Number,
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

balanceSchema.pre('save', async function (next) {
  // Crea un id de ira
  const uuid = new UuidGenerator().generate()

  // Asigna el id de ira a los atributos _id e id
  this._id = uuid
  this.id = uuid

  // Continúa con el proceso de guardado
  next()
})

export const BalanceModel = model<IBalance>('Balance', balanceSchema)
