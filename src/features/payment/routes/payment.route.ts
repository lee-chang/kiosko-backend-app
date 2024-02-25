import { Router } from 'express'
import { PaymentController } from '../controllers/payment.controller'
import { validatePermission } from '../../../core/middleware/validatePermission.middleware'
import { authRequired } from '../../../core/middleware/validateToken.middleware'
import { validatorShema } from '../../../core/middleware/validateSchema.middleware'
import { PaymentSchema } from '../schemas/payment.schema'
import Permission from '../../../core/interfaces/permissions'

const router = Router()

// * CRUD

router.get(
  '/',
  authRequired,
  validatePermission(Permission.READ_ROLE),
  PaymentController.getPayments
)
router.get(
  '/:id',
  authRequired,
  validatePermission(Permission.READ_ROLE),
  PaymentController.getPayment
)

router.delete(
  '/:id',
  authRequired,
  validatePermission(Permission.DELETE_ROLE),
  PaymentController.deletePayment
)
router.post(
  '/',
  authRequired,
  validatePermission(Permission.CREATE_ROLE),
  validatorShema(PaymentSchema.Create),
  PaymentController.createPayment
)

router.patch(
  '/:id',
  authRequired,
  validatePermission(Permission.UPDATE_ROLE),
  validatorShema(PaymentSchema.Update),
  PaymentController.updatePayment
)

export default router
