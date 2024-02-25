import { Router } from 'express'
import { BalanceController } from '../controllers/balance.controller'
import { validatePermission } from '../../../core/middleware/validatePermission.middleware'
import { authRequired } from '../../../core/middleware/validateToken.middleware'
import { validatorShema } from '../../../core/middleware/validateSchema.middleware'
import { BalanceSchema } from '../schemas/balance.schema'
import Permission from '../../../core/interfaces/permissions'

const router = Router()

// * CRUD

router.get(
  '/',
  authRequired,
  validatePermission(Permission.READ_ROLE),
  BalanceController.getBalances
)
router.get(
  '/:id',
  authRequired,
  validatePermission(Permission.READ_ROLE),
  BalanceController.getBalance
)

router.delete(
  '/:id',
  authRequired,
  validatePermission(Permission.DELETE_ROLE),
  BalanceController.deleteBalance
)
router.post(
  '/',
  authRequired,
  validatePermission(Permission.CREATE_ROLE),
  validatorShema(BalanceSchema.Create),
  BalanceController.createBalance
)

router.patch(
  '/:id',
  authRequired,
  validatePermission(Permission.UPDATE_ROLE),
  validatorShema(BalanceSchema.Update),
  BalanceController.updateBalance
)

export default router
