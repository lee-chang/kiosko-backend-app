/**
 * Template Permissions
 *
 * Define Action and Entidad // Accion y Entity
 *
 * CREATE_PRODUCT // Crear Producto
 * READ_PRODUCT // Leer Producto
 * UPDATE_PRODUCT // Actualizar Producto
 * DELETE_PRODUCT // Eliminar Producto
 *
 */

enum Permission {

  // ** ALL PERMISSIONS (FOR SUPER ADMIN)
  ALL_PERMISSIONS = 'ALL_PERMISSIONS',

  // ** USER MANAGEMENT
  // ROLE
  CREATE_ROLE = 'CREATE_ROLE',
  READ_ROLE = 'READ_ROLE',
  UPDATE_ROLE = 'UPDATE_ROLE',
  DELETE_ROLE = 'DELETE_ROLE',

  // USER
  CREATE_USER = 'CREATE_USER',
  READ_USER = 'READ_USER',
  UPDATE_USER = 'UPDATE_USER',
  DELETE_USER = 'DELETE_USER',


  // YOUR USER
  READ_YOUR_USER = 'READ_YOUR_USER',
  UPDATE_YOUR_USER = 'UPDATE_YOUR_USER',
  DELETE_YOUR_USER = 'DELETE_YOUR_USER',
}

// ** EXPORT PERMISSIONS LIST
export const permissions = {
  ...Permission
}


export default Permission

export interface PermissionObject {
  [key: string]: string
}

export type KeyPermissionsType = keyof typeof Permission

