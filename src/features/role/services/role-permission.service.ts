import { ErrorExt } from '../../../core/utils/http.response.util'
import Permission, {
  KeyPermissionsType,
  permissions,
} from '../../../core/interfaces/permissions'

import { RoleRepository } from '../repositories/role.repository'
import { HttpStatus } from '../../../core/interfaces/httpStatus.interface'

const roleRepository = new RoleRepository()

export class RolePermissionService {
  static isValidPermission(permission: KeyPermissionsType) {
    const isValid = permissions.hasOwnProperty(permission)

    return isValid ? true : false
  }

  static async isValidatePermissionByRol(
    name: string,
    permission: Permission
  ): Promise<Boolean> {
    const role = await roleRepository.findRoleByName(name)

    if (!role) throw new ErrorExt('ROLE_NOT_EXIST', HttpStatus.BAD_REQUEST)

    if (role.isActive === false)
      throw new ErrorExt('ROLE_INACTIVE', HttpStatus.BAD_REQUEST)

    const { permissions } = role

    // console.log('permissions', permissions)

    const hasAllPermissions = permissions.includes(Permission.ALL_PERMISSIONS)

    // console.log('hasAllPermissions', hasAllPermissions)

    if (hasAllPermissions) return true

    const hasPermission = permissions.includes(permission)

    return hasPermission
  }
}
