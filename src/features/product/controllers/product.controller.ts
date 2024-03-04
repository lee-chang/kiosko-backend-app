import { Request, Response, NextFunction } from 'express'
import { HttpStatus } from '../../../core/interfaces/httpStatus.interface'
import { ProductSevice } from '../services/product.service'
import { IProduct } from '../interfaces/product.interface'
import { KeyPermissionsType } from '../../../core/interfaces/permissions'

export class ProductController {
  static async getProducts(req: Request, res: Response, next: NextFunction) {
    let page = Number(req.query.page) || 1
    let limit = Number(req.query.limit) || Infinity

    try {
      const products = await ProductSevice.findAllProducts(page, limit)
      res.status(HttpStatus.OK).json(products)
    } catch (err) {
      next(err)
    }
  }

  static async getProduct(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params
    try {
      const product = await ProductSevice.findProductById(id)
      res.status(HttpStatus.OK).json(product)
    } catch (err) {
      next(err)
    }
  }

  static async createProduct(req: Request, res: Response, next: NextFunction) {
    const product: IProduct = req.body

    try {
      const newProduct = await ProductSevice.createProduct(
        product,
        req.files ?? undefined
      )
      res.status(HttpStatus.OK).json(newProduct)
    } catch (err) {
      next(err)
    }
  }

  static async deleteProduct(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params
    try {
      const product = await ProductSevice.deleteProductById(id)
      res.status(HttpStatus.OK).json(product)
    } catch (err) {
      next(err)
    }
  }

  static async updateProduct(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params
    const product: IProduct = req.body
    try {
      const updateProduct = await ProductSevice.updateProductById(id, product)
      res.status(HttpStatus.OK).json(updateProduct)
    } catch (err) {
      next(err)
    }
  }
}
