import { Router } from 'express'
import { OrderController } from '../controllers/order.controller'
import { validatePermission } from '../../../core/middleware/validatePermission.middleware'
import { authRequired } from '../../../core/middleware/validateToken.middleware'
import { validatorShema } from '../../../core/middleware/validateSchema.middleware'
import { OrderSchema } from '../schemas/order.schema'
import Permission from '../../../core/interfaces/permissions'

const router = Router()

// * CRUD

router.get(
  '/',
  authRequired,
  validatePermission(Permission.READ_ORDER),
  OrderController.getOrders
)
router.get(
  '/:id',
  authRequired,
  validatePermission(Permission.READ_ORDER),
  OrderController.getOrder
)
router.post(
  '/',
  authRequired,
  validatePermission(Permission.CREATE_ORDER),
  validatorShema(OrderSchema.Create),
  OrderController.createOrder
)

router.patch(
  '/:id',
  authRequired,
  validatePermission(Permission.UPDATE_ORDER),
  validatorShema(OrderSchema.Update),
  OrderController.updateOrder
)

router.delete(
  '/:id',
  authRequired,
  validatePermission(Permission.DELETE_ORDER),
  OrderController.deleteOrder
)

export default router
