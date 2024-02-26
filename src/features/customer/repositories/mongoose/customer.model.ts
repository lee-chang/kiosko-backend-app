import { ICustomer } from '../../interfaces/customer.interface'
import { UuidGenerator } from '../../../../core/utils/UuidGenerator.util'
import { model, Schema } from 'mongoose'
import { PersonSchema } from '../../../shared/repositories/mongoose/person.schema'
import { TeacherSchema } from './teacher.schema'
import { StudentSchema } from './student.schema'
import { ParentSchema } from './parent.schema'
import { phoneSchema } from '../../../shared/repositories/mongoose/phone.schema'
import { addressSchema } from '../../../shared/repositories/mongoose/address.schema'

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
    isIndependent: {
      type: Boolean,
      default: true,
    },

    balance: {
      ref: 'Balance',
      type: String,
    },

    typeCustomer: {
      type: String,
    },


    teacher: {
      type: TeacherSchema
    },

    student:{
      type: StudentSchema
    },

    parent:{
      type: ParentSchema
    },

    notes: [{
      type: String,
      trim: true,
    }],

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
