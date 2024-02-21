import { KeyPermissionsType } from '../../../core/interfaces/permissions'
import { TypePerson } from '../../shared/interfaces/person.interface'

export interface IRole {
  id: string
  name: string
  description: string
  tags?: string[]
  permissions: KeyPermissionsType[] // -> permissions access to Endpoints and actions del backend
  authorizations?: {
    module: string
    actions: string[]
  }[] // -> authorizations access to modules and actions del frontend
  by: TypePerson // -> TypePersonEnum values
  users: string[] // -> id of user, customer, etc
  isActive: boolean
  requires2FA?: boolean
  createdAt?: Date
  updatedAt?: Date
}
