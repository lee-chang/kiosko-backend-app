import { HttpStatus } from '../../../core/interfaces/httpStatus.interface'
import { IProduct } from '../interfaces/product.interface'
import { ProductRepository } from '../repositories/product.repository'
import { notUndefinedOrNull } from '../../../core/service/exceptions/data-not-received.exception'
import { ErrorExt } from '../../../core/utils/http.response.util'
import { KeyPermissionsType } from '../../../core/interfaces/permissions'

const productRepository = new ProductRepository()

export class ProductSevice {
  // ** CRUD

  static async findAllProducts(page: number, limit: number) {
    const products = await productRepository.findAllProducts(page, limit)
    return notUndefinedOrNull(products)
  }

  static async findProductById(id: string) {
    const product = await productRepository.findProductById(id)
    return notUndefinedOrNull(product)
  }

  static async updateProductById(id: string, product: IProduct) {
    const productUpdated = await productRepository.updateProductById(id, product)
    return notUndefinedOrNull(productUpdated)
  }

  static async deleteProductById(id: string) {
    const product = await productRepository.findProductById(id)
    if (!product) throw new ErrorExt('ROLE_NOT_EXIST', HttpStatus.BAD_REQUEST)
    const productDeleted = await productRepository.deleteProductById(id)
    return notUndefinedOrNull(productDeleted)
  }

  static async createProduct(product: IProduct) {
    const productCreated = await productRepository.createProduct(product)
    return notUndefinedOrNull(productCreated)
  }
}