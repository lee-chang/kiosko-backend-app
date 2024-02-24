import { PaginateData } from '../../../core/interfaces/resPaginate.interface'
import { IProduct } from './product.interface'

export interface ProductRepositoryPort {
  findAllProducts(page: number, limit: number): Promise<PaginateData<IProduct>>
  findProductById(id: string): Promise<IProduct | null>
  createProduct(rol: IProduct): Promise<IProduct | null>
  updateProductById(id: string, rol: IProduct): Promise<IProduct | null>
  deleteProductById(id: string): Promise<Boolean>
}
