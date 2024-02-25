import { OrderRepositoryPort } from '../interfaces/orderRepository.interface'
import { OrderRepositoryMongoDB } from './mongoose/order-mongo.repository'
import { IOrder } from '../interfaces/order.interface'
import { PaginateData } from '../../../core/interfaces/resPaginate.interface'

export class OrderRepository implements OrderRepositoryPort {
  private orderRepository: OrderRepositoryPort

  constructor() {
    this.orderRepository = new OrderRepositoryMongoDB()
  }

  async findAllOrders(
    page: number,
    limit: number
  ): Promise<PaginateData<IOrder>> {
    return await this.orderRepository.findAllOrders(page, limit)
  }

  async findOrderById(id: string): Promise<IOrder | null> {
    return await this.orderRepository.findOrderById(id)
  }

  async createOrder(order: IOrder): Promise<IOrder | null> {
    return await this.orderRepository.createOrder(order)
  }

  async updateOrderById(id: string, order: IOrder): Promise<IOrder | null> {
    return await this.orderRepository.updateOrderById(id, order)
  }

  async deleteOrderById(id: string): Promise<Boolean> {
    return await this.orderRepository.deleteOrderById(id)
  }
}
