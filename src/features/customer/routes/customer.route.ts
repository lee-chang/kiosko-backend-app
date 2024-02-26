import { Router } from 'express'
import { CustomerControlller } from '../controllers/customer.controller'
import { validatePermission } from '../../../core/middleware/validatePermission.middleware'

import { authRequired } from '../../../core/middleware/validateToken.middleware'
import { validatorShema } from '../../../core/middleware/validateSchema.middleware'
import { CustomerSchema } from '../schemas/customer.schema'
import Permission from '../../../core/interfaces/permissions'

const router = Router()

// ** CRUD
router.get(
  '/',
  authRequired,
  validatePermission(Permission.READ_CUSTOMER),
  CustomerControlller.getCustomers
)
router.get(
  '/:id',
  authRequired,
  validatePermission(Permission.READ_CUSTOMER),
  CustomerControlller.getCustomer
)
router.post(
  '/',
  authRequired,
  validatePermission(Permission.CREATE_CUSTOMER),
  validatorShema(CustomerSchema.Create),
  CustomerControlller.createCustomer
)
router.patch(
  '/:id',
  authRequired,
  validatorShema(CustomerSchema.Update),
  CustomerControlller.updateCustomer
)
router.delete(
  '/:id',
  authRequired,
  validatePermission(Permission.DELETE_CUSTOMER),
  CustomerControlller.deleteCustomer
)

export default router
