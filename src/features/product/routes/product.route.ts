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
  validatePermission(Permission.READ_PRODUCT),
  ProductController.getProducts
)
router.get(
  '/:id',
  authRequired,
  validatePermission(Permission.READ_PRODUCT),
  ProductController.getProduct
)
router.post(
  '/',
  authRequired,
  validatePermission(Permission.CREATE_PRODUCT),
  validatorShema(ProductSchema.Create),
  ProductController.createProduct
)

router.patch(
  '/:id',
  authRequired,
  validatePermission(Permission.UPDATE_PRODUCT),
  validatorShema(ProductSchema.Update),
  ProductController.updateProduct
)
router.delete(
  '/:id',
  authRequired,
  validatePermission(Permission.DELETE_PRODUCT),
  ProductController.deleteProduct
)
export default router
