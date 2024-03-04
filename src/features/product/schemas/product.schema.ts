import z from 'zod'
import { IProduct } from '../interfaces/product.interface'

// Hacer uso de la interfaz IUser
const productSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  // String but only accept numbers
  reference_price: z.string().refine((val) => {
    if (isNaN(Number(val))) return false
    return true
  }),
  image: z
    .custom<FileList>()
    .transform((val) => {
      if (val instanceof File) return val
      if (val instanceof FileList) return val[0]
      return null
    })
    .superRefine((file, ctx) => {
      if (!(file instanceof File)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          fatal: true,
          message: 'Please provide an image file',
        })

        return z.NEVER
      }

      if (file.size > 5 * 1024 * 1024) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Max file size allowed is 5MB',
        })
      }

      if (
        !['image/jpeg', 'image/png', 'image/webp', 'image/jpg'].includes(
          file.type
        )
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'File must be an image (jpeg, jpg, png, webp)',
        })
      }
    })
    .pipe(z.custom<File>())
    .optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
})

export const ProductSchema = {
  Create: productSchema.omit({ id: true, createdAt: true, updatedAt: true }),
  Update: productSchema
    .partial()
    .omit({ id: true, createdAt: true, updatedAt: true }),
}
