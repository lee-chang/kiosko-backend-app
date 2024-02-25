import { Schema, model, Types } from 'mongoose'
import { IOrder } from '../../interfaces/order.interface'
import { UuidGenerator } from '../../../../core/utils/UuidGenerator.util'
const orderSchema: Schema = new Schema<IOrder & { _id: string }>(
  {
    _id: {
      type: String,
    },
    id: {
      type: String,
      unique: true,
      key: true,
    },

    credit: {
      type: String,
      ref: 'Credit',
    },
  
    staff: {
      type: String,
      required: true,
    },
  
    customer: {
      type: String,
      ref: 'Customer',
      required: true,
    },

    total_amount: {
      type: Number,
      required: true,
    },

    products: [{
      product:{
        type: String,
        ref: 'Product',
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      total: {
        type: Number,
        required: true,
      },
    }],

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

orderSchema.pre('save', async function (next) {
  // Crea un id de ira
  const uuid = new UuidGenerator().generate()

  // Asigna el id de ira a los atributos _id e id
  this._id = uuid
  this.id = uuid

  // Continúa con el proceso de guardado
  next()
})

export const OrderModel = model<IOrder>('Order', orderSchema)
