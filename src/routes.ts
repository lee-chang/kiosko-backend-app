import { Router } from 'express'
import { RouterPath } from './core/service/loggerRouter.service'

import CustomerRouter from './features/customer/routes/customer.route'
import UserRouter from './features/user/routes/user.route'
import AuthUserRouter from './features/auth/routes/auth.route'
import RoleRouter from './features/role/routes/role.route'
import PermissionRouter from './features/role/routes/permission.route'

import CompanyRouter from './features/company/routes/company.route'
import ProductRouter from './features/product/routes/product.route'
import PaymentRouter from './features/payment/routes/payment.route'
import OrderRouter from './features/order/routes/order.route'
import CreditRouter from './features/credit/routes/credit.route'
import BalanceRouter from './features/balance/routes/balance.route'

import CSCRouter from './features/common/country-state-city/routes/csc.route'

const route = new RouterPath()

const router = Router()

router.use(route.getApiPath('auth'), AuthUserRouter)
router.use(route.getApiPath('customer'), CustomerRouter)
router.use(route.getApiPath('user'), UserRouter)
router.use(route.getApiPath('role'), RoleRouter)
router.use(route.getApiPath('permission'), PermissionRouter)

//Rutas para el kiosko
router.use(route.getApiPath('company'), CompanyRouter)
router.use(route.getApiPath('product'), ProductRouter)
router.use(route.getApiPath('payment'), PaymentRouter)
router.use(route.getApiPath('order'), OrderRouter)
router.use(route.getApiPath('credit'), CreditRouter)
router.use(route.getApiPath('balance'), BalanceRouter)

// Rutas common
router.use(route.getApiPath('common/csc'), CSCRouter) // Country State City

export default router
