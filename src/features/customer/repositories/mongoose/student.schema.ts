import { Schema } from 'mongoose'
import { IStudent } from '../../interfaces/customer.interface'

export const StudentSchema = new Schema<IStudent>({
  level: {
    type: String,
  },
  grade: {
    type: String,
  },
  section: {
    type: String,

  },
})
