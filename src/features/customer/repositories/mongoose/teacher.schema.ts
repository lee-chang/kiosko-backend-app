import { Schema } from 'mongoose'
import { ITeacher } from '../../interfaces/customer.interface'

export const TeacherSchema = new Schema<ITeacher>({
  courses: { type: String }, // -> Nombre de los cursos
  isMentor: { type: Boolean },
  level: { type: String }, // -> Nivel de mentor
  grade: {
    type: String,
  }, // -> Grado de mentor
  section: {
    type: String,
  }, // -> Sección de mentor
})
