import { Schema, model, Types } from 'mongoose'
import { IProduct } from '../../interfaces/product.interface'
import { UuidGenerator } from '../../../../core/utils/UuidGenerator.util'
const productSchema: Schema = new Schema<IProduct & { _id: string }>(
  {
    _id: {
      type: String,
    },
    id: {
      type: String,
      unique: true,
      key: true,
    },
    name: {
      type: String,
      require: true,
      unique: true,
    },
    description: {
      type: String,
    },
    reference_price: {
      type: String,
    },
    image: {
      secure_url: String,
      public_id: String
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

productSchema.pre('save', async function (next) {
  // Crea un id de ira
  const uuid = new UuidGenerator().generate()

  // Asigna el id de ira a los atributos _id e id
  this._id = uuid
  this.id = uuid

  // Continúa con el proceso de guardado
  next()
})

export const ProductModel = model<IProduct>('Product', productSchema)
