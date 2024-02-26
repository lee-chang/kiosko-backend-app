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
  validatePermission(Permission.READ_PAYMENT),
  PaymentController.getPayments
)
router.get(
  '/:id',
  authRequired,
  validatePermission(Permission.READ_PAYMENT),
  PaymentController.getPayment
)
router.post(
  '/',
  authRequired,
  validatePermission(Permission.CREATE_PAYMENT),
  validatorShema(PaymentSchema.Create),
  PaymentController.createPayment
)
router.patch(
  '/:id',
  authRequired,
  validatePermission(Permission.UPDATE_PAYMENT),
  validatorShema(PaymentSchema.Update),
  PaymentController.updatePayment
)

router.delete(
  '/:id',
  authRequired,
  validatePermission(Permission.DELETE_PAYMENT),
  PaymentController.deletePayment
)

export default router
