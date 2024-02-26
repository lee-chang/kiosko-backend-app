import { Schema } from 'mongoose'
import { IParent } from '../../interfaces/customer.interface'

export const ParentSchema = new Schema<IParent>({
  isParent: { type: Boolean },
  child: [{ type: String, ref: 'Customer' }], // -> id de los hijos
})
