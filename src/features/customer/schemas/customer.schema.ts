

import z, { Schema } from 'zod'
import {
  IChild,
  ICustomer,
  IParent,
  IStudent,
  ITeacher,
  LevelCollege,
  TypeCustomer,
} from '../interfaces/customer.interface'

import { addressSchema } from '../../shared/schemas/address.schema'
import { phoneSchema } from '../../shared/schemas/phone.schema'
import { personSchema } from '../../shared/schemas/person.schema'

// Hacer uso de la interfaz IUser

const teacherSchema = z.object({
  courses: z.array(z.string()),
  isMentor: z.boolean(),
  level: z.nativeEnum(LevelCollege),
  grade: z.string(), // -> Grado de mentor
  section: z.string(), // -> Sección de mentor
  specialty: z.string(), // -> Especialidad
}) satisfies z.ZodType<ITeacher>


const studentSchema = z.object({
  level: z.nativeEnum(LevelCollege).optional(),
  grade: z.number().optional(),
  section: z.string().optional(),
}) satisfies z.ZodType<IStudent>


const childSchema = personSchema.extend({
  level: z.nativeEnum(LevelCollege).optional(),
  grade: z.number().optional(),
  section: z.string().optional(),
}) satisfies z.ZodType<IChild>

const parentSchema = z.object({
  isParent: z.boolean(),
  child: z.array(childSchema),
}) satisfies z.ZodType<IParent>


const customerSchema = personSchema.extend({
  id: z.string(),
  isIndependent: z.boolean(),
  balance: z.string(),
  typeCustomer: z.nativeEnum(TypeCustomer),

  teacher: teacherSchema.partial().optional(),
  student: studentSchema.optional(),
  parent: parentSchema.optional(),

  notes: z.array(z.string()).optional(),
}) satisfies z.ZodType<ICustomer>

export const CustomerSchema = {
  Create: customerSchema.omit({ id: true }),
  Update: customerSchema.omit({ id: true }).partial(),
}
