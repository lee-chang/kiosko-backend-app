import {v2 as cloudinary} from 'cloudinary'
import {ENV_CONFIG} from '../../config/env.config'

cloudinary.config({
  cloud_name: ENV_CONFIG.CLOUDINARY_CLOUD_NAME, 
  api_key: ENV_CONFIG.CLOUDINARY_API_KEY, 
  api_secret: ENV_CONFIG.CLOUDINARY_API_SECRET,
  secure: true
})


export const uploadImage = async (filePath: string) => {
  return await cloudinary.uploader.upload(filePath, {
    folder: 'replit'
  })
}

export const deleteImage = async (publicId: string) => {
  return await cloudinary.uploader.destroy(publicId)
}