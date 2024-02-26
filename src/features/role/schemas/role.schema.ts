import z from 'zod'
import Permission, { permissions } from '../../../core/interfaces/permissions'
import { TypePerson } from '../../shared/interfaces/person.interface'
import { IRole, Authorizations } from '../interfaces/role.interface'

const authorizationsSchema = z.object({
  module: z.string(),
  submodule: z.array(
    z.object({
      name: z.string(),
      authorization: z.array(
        z.object({
          name: z.string(),
          permissions: z.array(z.string()),
        })
      ),
    })
  ),
}) satisfies z.ZodType<Authorizations>

// Hacer uso de la interfaz IRole
const roleSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),

  // If
  permissions: z.array(z.string()),
  authorizations: z.array(authorizationsSchema),
  by: z.nativeEnum(TypePerson),
  tags: z.array(z.string()).optional(),
  users: z.array(z.string()),
  isActive: z.boolean(),
  requires2FA: z.boolean().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
}) satisfies z.ZodType<IRole>

export const RoleSchema = {
  Create: roleSchema.omit({ id: true }),
  // Todo sera opciona
  Update: roleSchema.partial(),
  UpdatePermissions: roleSchema.pick({ permissions: true }),
  //object to authorizations and permissions
  UpdateAuthorizations: roleSchema.pick({ authorizations: true }),
}
