import { IProduct } from '../../interfaces/product.interface'
import { ProductModel } from './product.model'
import { ProductRepositoryPort } from '../../interfaces/productRepository.interface'
import {
  PaginateData,
  initialPaginateData,
} from '../../../../core/interfaces/resPaginate.interface'

export class ProductRepositoryMongoDB implements ProductRepositoryPort {
  async findAllProducts(
    page: number,
    limit: number
  ): Promise<PaginateData<IProduct>> {
    const totalProducts = await ProductModel.countDocuments()

    const totalPages = Math.ceil(totalProducts / limit)

    const currentPage = page > totalPages ? totalPages : page || 1

    const products = await ProductModel.find()
      .limit(limit)
      .skip((page - 1) * limit)
      .exec()

    if (!products) {
      return initialPaginateData
    }

    let response: PaginateData<IProduct> = {
      total: totalProducts,
      totalPages,
      currentPage,
      data: products,
    }
    return response
  }

  async findProductById(id: string) {
    const product = await ProductModel.findById(id)
    return product
  }

  async createProduct(product: IProduct) {
    const newProduct = new ProductModel(product)
    const productCreated = await newProduct.save()
    return productCreated
  }

  async updateProductById(id: string, product: IProduct) {
    const updateRol = await ProductModel.findByIdAndUpdate(id, product, { new: true })
    return updateRol
  }

  async deleteProductById(id: string) {
    const deleteProduct = await ProductModel.findByIdAndDelete(id)
    return deleteProduct ? true : false
  }

  async findProductByName(name: string) {
    const product = await ProductModel.findOne({ name })
    return product
  }
}
