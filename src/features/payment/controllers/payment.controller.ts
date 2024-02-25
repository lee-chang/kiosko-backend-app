import { Request, Response, NextFunction } from 'express'
import { HttpStatus } from '../../../core/interfaces/httpStatus.interface'
import { PaymentSevice } from '../services/payment.service'
import { IPayment } from '../interfaces/payment.interface'
import { KeyPermissionsType } from '../../../core/interfaces/permissions'

export class PaymentController {
  static async getPayments(req: Request, res: Response, next: NextFunction) {
    let page = Number(req.query.page) || 1
    let limit = Number(req.query.limit) || Infinity

    try {
      const payments = await PaymentSevice.findAllPayments(page, limit)
      res.status(HttpStatus.OK).json(payments)
    } catch (err) {
      next(err)
    }
  }

  static async getPayment(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params
    try {
      const payment = await PaymentSevice.findPaymentById(id)
      res.status(HttpStatus.OK).json(payment)
    } catch (err) {
      next(err)
    }
  }

    static async createPayment(req: Request, res: Response, next: NextFunction) {
    const payment: IPayment = req.body
    try {
      const newPayment = await PaymentSevice.createPayment(payment)
      res.status(HttpStatus.OK).json(newPayment)
    } catch (err) {
      next(err)
    }
  }

  static async deletePayment(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params
    try {
      const payment = await PaymentSevice.deletePaymentById(id)
      res.status(HttpStatus.OK).json(payment)
    } catch (err) {
      next(err)
    }
  }

  static async updatePayment(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params
    const payment: IPayment = req.body
    try {
      const updatePayment = await PaymentSevice.updatePaymentById(id, payment)
      res.status(HttpStatus.OK).json(updatePayment)
    } catch (err) {
      next(err)
    }
  }
}
