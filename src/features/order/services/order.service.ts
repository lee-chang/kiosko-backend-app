import { HttpStatus } from '../../../core/interfaces/httpStatus.interface'
import { IOrder } from '../interfaces/order.interface'
import { OrderRepository } from '../repositories/order.repository'
import { notUndefinedOrNull } from '../../../core/service/exceptions/data-not-received.exception'
import { ErrorExt } from '../../../core/utils/http.response.util'
import { KeyPermissionsType } from '../../../core/interfaces/permissions'

const orderRepository = new OrderRepository()

export class OrderSevice {
  // ** CRUD

  static async findAllOrders(page: number, limit: number) {
    const orders = await orderRepository.findAllOrders(page, limit)
    return notUndefinedOrNull(orders)
  }

  static async findOrderById(id: string) {
    const order = await orderRepository.findOrderById(id)
    return notUndefinedOrNull(order)
  }

  static async updateOrderById(id: string, order: IOrder) {
    const orderUpdated = await orderRepository.updateOrderById(id, order)
    return notUndefinedOrNull(orderUpdated)
  }

  static async deleteOrderById(id: string) {
    const order = await orderRepository.findOrderById(id)
    if (!order) throw new ErrorExt('ROLE_NOT_EXIST', HttpStatus.BAD_REQUEST)
    const orderDeleted = await orderRepository.deleteOrderById(id)
    return notUndefinedOrNull(orderDeleted)
  }

  static async createOrder(order: IOrder) {
    const orderCreated = await orderRepository.createOrder(order)
    return notUndefinedOrNull(orderCreated)
  }
}