import { Router } from 'express'
import { CreditController } from '../controllers/credit.controller'
import { validatePermission } from '../../../core/middleware/validatePermission.middleware'
import { authRequired } from '../../../core/middleware/validateToken.middleware'
import { validatorShema } from '../../../core/middleware/validateSchema.middleware'
import { CreditSchema } from '../schemas/credit.schema'
import Permission from '../../../core/interfaces/permissions'

const router = Router()

// * CRUD

router.get(
  '/',
  authRequired,
  validatePermission(Permission.READ_CREDIT),
  CreditController.getCredits
)
router.get(
  '/:id',
  authRequired,
  validatePermission(Permission.READ_CREDIT),
  CreditController.getCredit
)

router.delete(
  '/:id',
  authRequired,
  validatePermission(Permission.DELETE_CREDIT),
  CreditController.deleteCredit
)
router.post(
  '/',
  authRequired,
  validatePermission(Permission.CREATE_CREDIT),
  validatorShema(CreditSchema.Create),
  CreditController.createCredit
)

router.patch(
  '/:id',
  authRequired,
  validatePermission(Permission.UPDATE_CREDIT),
  validatorShema(CreditSchema.Update),
  CreditController.updateCredit
)

export default router
