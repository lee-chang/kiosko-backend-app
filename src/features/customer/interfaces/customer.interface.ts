import { IPerson } from '../../shared/interfaces/person.interface'

export interface ICustomer extends IPerson {
  id: string
  
  isIndependent:boolean

  // balance
  balance: string // -> id de los balances
  
  // Type Customer
  typeCustomer: TypeCustomer

  // Attributes of Teacher
  teacher?: ITeacher
  student?: IStudent
  parent?: IParent

  // Details Extras
  notes?: string[]

  createdAt?: Date
  updatedAt?: Date
}

export interface IParent {
  isParent?: boolean
  child?: IChild[]
}

export interface IChild extends IPerson,IStudent {}

export interface ITeacher {
  courses?: string // -> Nombre de los cursos
  isMentor?: boolean
  level?: LevelCollege
  grade?: string // -> Grado de mentor
  section?: string // -> Sección de mentor
}

export interface IStudent {
  level?: LevelCollege // -> Nivel
  grade?: string // -> Grado
  section?: string // -> Sección
}

export enum LevelCollege {
  primary = 'Primaria',
  secondary = 'Secundaria',
  initial = 'Inicial',
}

export enum TypeCustomer {
  teacher = 'Profesor',
  student = 'Estudiante',
  parent = 'Padre',
  other = 'Otro',
}
