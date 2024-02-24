import { IPerson } from '../../shared/interfaces/person.interface'

export interface ICustomer extends IPerson {
  id: string
  
  isIndependent:boolean

  // balance
  balance: string[] // -> id de los balances
  
  // Type Customer
  typeCustomer: TypeCustomer

  // Attributes of Teacher
  teacher?: ITeacher
  student?: IStudent
  employee?: IEmploye
  parent?: IParent

  // Details Extras
  notes?: string[]

  createdAt?: Date
  updatedAt?: Date
}

interface IParent {
  isParent: boolean
  child?: string[] // -> id de los hijos
}

interface IEmploye {
  position?: string // -> Cargo
  area?: string // -> Area
}

interface ITeacher {
  courses?: string[] // -> Nombre de los cursos
  isMentor?: boolean
  level?: LevelCollege
  grade?: string // -> Grado de mentor
  section?: string // -> Sección de mentor
  specialty?: string // -> Especialidad
}

interface IStudent {
  level?: LevelCollege // -> Nivel
  grade?: number // -> Grado
  section?: string // -> Sección
}

enum LevelCollege {
  primary = 'primary',
  secondary = 'secondary',
  initial = 'initial',
  other = 'other',
}

enum TypeCustomer {
  teacher = 'teacher',
  employee = 'employee',
  student = 'student',
  parent = 'parent',
  other = 'other',
}
