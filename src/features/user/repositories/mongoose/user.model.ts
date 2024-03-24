import { model, Schema } from 'mongoose'
import { UuidGenerator } from '../../../../core/utils/UuidGenerator.util'
import { IUser } from '../../interfaces/user.interface'

import { PersonSchema } from '../../../shared/repositories/mongoose/person.schema'
import { phoneSchema } from '../../../shared/repositories/mongoose/phone.schema'
import { addressSchema } from '../../../shared/repositories/mongoose/address.schema'


const UserSchema: Schema = new Schema<IUser & {_id:string}>(
  {
    _id: {
      type:String
    },
    id: {
      type: String,
      unique: true,
      key: true      
    },
    userName: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      require: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    role: [
      {
        type: String,
        ref: 'Role',
      },
    ],
    company: {
      type: String,
      ref: 'Company',
    },
    verified: {
      type: Boolean,
      default: false,
    },
    login_code: {
      type: String,
      trim: true,
    },
    recovery_code: {
      type: String,
      trim: true,
    },
    lastLogin: {
      type: Date
    },



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



UserSchema.pre('save', async function(next) {
  // Crea un id de ira
  const uuid = new UuidGenerator().generate();

  // Asigna el id de ira a los atributos _id e id
  this._id = uuid;
  this.id = uuid;

  // Continúa con el proceso de guardado
  next();
});

const UserModel = model<IUser>('User', UserSchema)
export default UserModel
