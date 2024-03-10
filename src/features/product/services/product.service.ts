import { HttpStatus } from '../../../core/interfaces/httpStatus.interface'
import { IProduct } from '../interfaces/product.interface'
import { ProductRepository } from '../repositories/product.repository'
import { notUndefinedOrNull } from '../../../core/service/exceptions/data-not-received.exception'
import { ErrorExt } from '../../../core/utils/http.response.util'
import { KeyPermissionsType } from '../../../core/interfaces/permissions'
import { FileArray, UploadedFile } from 'express-fileupload'
import { deleteImage, uploadImage } from '../../../core/utils/cloudinary.util'
import fs from 'fs-extra'

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
    const productUpdated = await productRepository.updateProductById(
      id,
      product
    )
    return notUndefinedOrNull(productUpdated)
  }

  static async deleteProductById(id: string) {
    const product = await productRepository.findProductById(id)
    if (!product)
      throw new ErrorExt('PRODUCT_NOT_EXIST', HttpStatus.BAD_REQUEST)

    // if (product.image) await deleteImage(product.image.public_id)

    const productDeleted = await productRepository.deleteProductById(id)
    return notUndefinedOrNull(productDeleted)
  }

  static async createProduct(product: IProduct, files?: FileArray) {
    const isProductExist = await productRepository.findProductByName(
      product.name
    )
    if (isProductExist)
      throw new ErrorExt('PRODUCT_EXIST', HttpStatus.BAD_REQUEST)

    if (files) {
      const { image: uploadedFile } = JSON.parse(JSON.stringify(files)) as {
        image: UploadedFile | UploadedFile[]
      }
      // console.log('uploadedFile', uploadedFile)

      if (Array.isArray(uploadedFile)) {
        const resultUploaded = await uploadImage(uploadedFile[0].tempFilePath)
        product.image = {
          public_id: resultUploaded.public_id,
          secure_url: resultUploaded.secure_url,
        }

        uploadedFile.forEach(async (f) => {
          await fs.unlink(f.tempFilePath, (err) => {
            if (err) console.log('not deleted file image', err)
            console.log(`${f.tempFilePath} image deleted success`)
          })
        })
      } else {
        // console.log ("entro a upload image simple")
        const resultUploaded = await uploadImage(uploadedFile.tempFilePath)
        // console.log("termino de cargar la imagen a clodinary")
        product.image = {
          public_id: resultUploaded.public_id,
          secure_url: resultUploaded.secure_url,
        }
        await fs.unlink(uploadedFile.tempFilePath, (err) => {
          if (err) console.log('not deleted file image', err)
          console.log(`${uploadedFile.tempFilePath} image deleted success`)
        })
      }
    }

    const productCreated = await productRepository.createProduct(product)
    return notUndefinedOrNull(productCreated)
  }
}
