import { Router } from 'express'
import { RouterPath } from './core/service/loggerRouter.service'

import CustomerRouter from './features/customer/routes/customer.route'
import UserRouter from './features/user/routes/user.route'
import AuthUserRouter from './features/auth/routes/auth.route'
import RoleRouter from './features/role/routes/role.route'
import PermissionRouter from './features/role/routes/permission.route'

import CompanyRouter from './features/company/routes/company.route'

const route = new RouterPath()

const router = Router()

router.use(route.getApiPath('auth'), AuthUserRouter)
router.use(route.getApiPath('customer'), CustomerRouter)
router.use(route.getApiPath('user'), UserRouter)
router.use(route.getApiPath('role'), RoleRouter)
router.use(route.getApiPath('permission'), PermissionRouter)




//Rutas para el kiosko
router.use(route.getApiPath('company'),CompanyRouter)


export default router
