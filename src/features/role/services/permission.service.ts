import {
  PermissionObject,
  permissions,
} from '../../../core/interfaces/permissions'

export class PermissionService {
  static listKeysPermissions(): PermissionObject {
    return permissions
  }
}
