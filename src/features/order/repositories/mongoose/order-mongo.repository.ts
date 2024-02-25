import { IOrder } from '../../interfaces/order.interface'
import { OrderModel } from './order.model'
import { OrderRepositoryPort } from '../../interfaces/orderRepository.interface'
import {
  PaginateData,
  initialPaginateData,
} from '../../../../core/interfaces/resPaginate.interface'

export class OrderRepositoryMongoDB implements OrderRepositoryPort {
  async findAllOrders(
    page: number,
    limit: number
  ): Promise<PaginateData<IOrder>> {
    const totalOrders = await OrderModel.countDocuments()

    const totalPages = Math.ceil(totalOrders / limit)

    const currentPage = page > totalPages ? totalPages : page || 1

    const orders = await OrderModel.find()
      .limit(limit)
      .skip((page - 1) * limit)
      .exec()

    if (!orders) {
      return initialPaginateData
    }

    let response: PaginateData<IOrder> = {
      total: totalOrders,
      totalPages,
      currentPage,
      data: orders,
    }
    return response
  }

  async findOrderById(id: string) {
    const order = await OrderModel.findById(id)
    return order
  }

  async createOrder(order: IOrder) {
    const newOrder = new OrderModel(order)
    const orderCreated = await newOrder.save()
    return orderCreated
  }

  async updateOrderById(id: string, order: IOrder) {
    const updateRol = await OrderModel.findByIdAndUpdate(id, order, { new: true })
    return updateRol
  }

  async deleteOrderById(id: string) {
    const deleteOrder = await OrderModel.findByIdAndDelete(id)
    return deleteOrder ? true : false
  }
}
