import { ProductRepositoryPort } from '../interfaces/productRepository.interface'
import { ProductRepositoryMongoDB } from './mongoose/product-mongo.repository'
import { IProduct } from '../interfaces/product.interface'
import { PaginateData } from '../../../core/interfaces/resPaginate.interface'

export class ProductRepository implements ProductRepositoryPort {
  private productRepository: ProductRepositoryPort

  constructor() {
    this.productRepository = new ProductRepositoryMongoDB()
  }

  async findAllProducts(
    page: number,
    limit: number
  ): Promise<PaginateData<IProduct>> {
    return await this.productRepository.findAllProducts(page, limit)
  }

  async findProductById(id: string): Promise<IProduct | null> {
    return await this.productRepository.findProductById(id)
  }

  async createProduct(product: IProduct): Promise<IProduct | null> {
    return await this.productRepository.createProduct(product)
  }

  async updateProductById(id: string, product: IProduct): Promise<IProduct | null> {
    return await this.productRepository.updateProductById(id, product)
  }

  async deleteProductById(id: string): Promise<Boolean> {
    return await this.productRepository.deleteProductById(id)
  }
}
