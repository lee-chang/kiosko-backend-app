import { CompanyControlller } from '../controllers/company.controller'
// import { validatePermission } from '../../../core/middlewares/validatePermission'
import { Router } from 'express'

import { authRequired } from '../../../core/middleware/validateToken.middleware'
import { validatorShema } from '../../../core/middleware/validateSchema.middleware'
import { validatePermission } from '../../../core/middleware/validatePermission.middleware'

import { CompanySchema } from '../schemas/company.schema'
import Permission from '../../../core/interfaces/permissions'

const router = Router()

// ** CRUD
router.get(
  '/',
  authRequired,
  validatePermission(Permission.READ_COMPANY),
  CompanyControlller.getCompanies
)
router.get(
  '/:id',
  authRequired,
  validatePermission(Permission.READ_COMPANY),
  CompanyControlller.getCompany
)
router.post(
  '/',
  authRequired,
  validatePermission(Permission.CREATE_COMPANY),
  CompanyControlller.createCompany
)

router.patch(
  '/:id',
  authRequired,
  validatePermission(Permission.UPDATE_COMPANY),
  validatorShema(CompanySchema.Update),
  CompanyControlller.updateCompany
)

router.delete(
  '/:id',
  authRequired,
  validatePermission(Permission.DELETE_COMPANY),
  CompanyControlller.deleteCompany
)



export default router
