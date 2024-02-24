import { Router } from 'express'
import { CustomerControlller } from '../controllers/customer.controller'
// import { validatePermission } from '../../../core/middlewares/validatePermission'

import { authRequired } from '../../../core/middleware/validateToken.middleware'
import { validatorShema } from '../../../core/middleware/validateSchema.middleware'
import { CustomerSchema } from '../schemas/customer.schema'

const router = Router()

// ** CRUD
router.get('/', authRequired, CustomerControlller.getCustomers)
router.get('/:id', authRequired, CustomerControlller.getCustomer)
router.post('/', authRequired, CustomerControlller.createCustomer)
router.delete('/:id', authRequired, CustomerControlller.deleteCustomer)
router.patch(
  '/:id',
  authRequired,
  validatorShema(CustomerSchema.Update),
  CustomerControlller.updateCustomer
)

export default router
