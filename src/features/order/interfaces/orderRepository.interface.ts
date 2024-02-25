import { PaginateData } from '../../../core/interfaces/resPaginate.interface'
import { IOrder } from './order.interface'

export interface OrderRepositoryPort {
  findAllOrders(page: number, limit: number): Promise<PaginateData<IOrder>>
  findOrderById(id: string): Promise<IOrder | null>
  createOrder(order: IOrder): Promise<IOrder | null>
  updateOrderById(id: string, order: IOrder): Promise<IOrder | null>
  deleteOrderById(id: string): Promise<Boolean>
}
