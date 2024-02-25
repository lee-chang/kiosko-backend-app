import z from 'zod'
import { IOrder, IProductSale, OrderStatus } from '../interfaces/order.interface'


const productSaleSchema = z.object({
  product: z.string(),
  quantity: z.number(),
  price: z.number(),
  total: z.number(),
}) satisfies z.ZodType<IProductSale> 



// Hacer uso de la interfaz IUser
const orderSchema= z.object({
  id: z.string(),
  credit: z.string().optional(),
  customer: z.string(),
  staff: z.string(),
  total_amount: z.number(),

  products: z.array(productSaleSchema),

  status: z.nativeEnum(OrderStatus),


  observation: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
})  satisfies z.ZodType<IOrder> 

export const OrderSchema = {
  Create: orderSchema.omit({ id: true, createdAt: true, updatedAt: true }),
  Update: orderSchema.partial().omit({ id: true, createdAt: true, updatedAt: true }),
}
