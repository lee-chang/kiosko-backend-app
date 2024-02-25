import { Schema, model } from 'mongoose'
import { UuidGenerator } from '../../../../core/utils/UuidGenerator.util'
import { ICredit } from '../../interfaces/credit.interface'
const creditSchema: Schema = new Schema<ICredit & { _id: string }>(
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

    order: {
      type: String,
      ref: 'Order',
      required: true,
    },

    customer: {
      type: String,
      ref: 'Customer',
      required: true,
    },

    status: {
      type: String,
      required: true,
    },

    staff: {
      type: String,
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

creditSchema.pre('save', async function (next) {
  // Crea un id de ira
  const uuid = new UuidGenerator().generate()

  // Asigna el id de ira a los atributos _id e id
  this._id = uuid
  this.id = uuid

  // Continúa con el proceso de guardado
  next()
})

export const CreditModel = model<ICredit>('Credit', creditSchema)
