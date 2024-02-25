import { Request, Response, NextFunction } from 'express'
import { HttpStatus } from '../../../core/interfaces/httpStatus.interface'
import { OrderSevice } from '../services/order.service'
import { IOrder } from '../interfaces/order.interface'
import { KeyPermissionsType } from '../../../core/interfaces/permissions'

export class OrderController {
  static async getOrders(req: Request, res: Response, next: NextFunction) {
    let page = Number(req.query.page) || 1
    let limit = Number(req.query.limit) || Infinity

    try {
      const orders = await OrderSevice.findAllOrders(page, limit)
      res.status(HttpStatus.OK).json(orders)
    } catch (err) {
      next(err)
    }
  }

  static async getOrder(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params
    try {
      const order = await OrderSevice.findOrderById(id)
      res.status(HttpStatus.OK).json(order)
    } catch (err) {
      next(err)
    }
  }

    static async createOrder(req: Request, res: Response, next: NextFunction) {
    const order: IOrder = req.body
    try {
      const newOrder = await OrderSevice.createOrder(order)
      res.status(HttpStatus.OK).json(newOrder)
    } catch (err) {
      next(err)
    }
  }

  static async deleteOrder(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params
    try {
      const order = await OrderSevice.deleteOrderById(id)
      res.status(HttpStatus.OK).json(order)
    } catch (err) {
      next(err)
    }
  }

  static async updateOrder(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params
    const order: IOrder = req.body
    try {
      const updateOrder = await OrderSevice.updateOrderById(id, order)
      res.status(HttpStatus.OK).json(updateOrder)
    } catch (err) {
      next(err)
    }
  }
}
