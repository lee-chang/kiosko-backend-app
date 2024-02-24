import { Router } from 'express'
import { ProductController } from '../controllers/product.controller'
import { validatePermission } from '../../../core/middleware/validatePermission.middleware'
import { authRequired } from '../../../core/middleware/validateToken.middleware'
import { validatorShema } from '../../../core/middleware/validateSchema.middleware'
import { ProductSchema } from '../schemas/product.schema'
import Permission from '../../../core/interfaces/permissions'

const router = Router()

// * CRUD

router.get(
  '/',
  authRequired,
  validatePermission(Permission.READ_ROLE),
  ProductController.getProducts
)
router.get(
  '/:id',
  authRequired,
  validatePermission(Permission.READ_ROLE),
  ProductController.getProduct
)

router.delete(
  '/:id',
  authRequired,
  validatePermission(Permission.DELETE_ROLE),
  ProductController.deleteProduct
)
router.post(
  '/',
  authRequired,
  validatePermission(Permission.CREATE_ROLE),
  validatorShema(ProductSchema.Create),
  ProductController.createProduct
)

router.patch(
  '/:id',
  authRequired,
  validatePermission(Permission.UPDATE_ROLE),
  validatorShema(ProductSchema.Update),
  ProductController.updateProduct
)

export default router
