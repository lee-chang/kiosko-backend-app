import { HttpStatus } from '../../../core/interfaces/httpStatus.interface'
import { IPayment } from '../interfaces/payment.interface'
import { PaymentRepository } from '../repositories/payment.repository'
import { notUndefinedOrNull } from '../../../core/service/exceptions/data-not-received.exception'
import { ErrorExt } from '../../../core/utils/http.response.util'
import { KeyPermissionsType } from '../../../core/interfaces/permissions'

const paymentRepository = new PaymentRepository()

export class PaymentSevice {
  // ** CRUD

  static async findAllPayments(page: number, limit: number) {
    const payments = await paymentRepository.findAllPayments(page, limit)
    return notUndefinedOrNull(payments)
  }

  static async findPaymentById(id: string) {
    const payment = await paymentRepository.findPaymentById(id)
    return notUndefinedOrNull(payment)
  }

  static async updatePaymentById(id: string, payment: IPayment) {
    const paymentUpdated = await paymentRepository.updatePaymentById(id, payment)
    return notUndefinedOrNull(paymentUpdated)
  }

  static async deletePaymentById(id: string) {
    const payment = await paymentRepository.findPaymentById(id)
    if (!payment) throw new ErrorExt('ROLE_NOT_EXIST', HttpStatus.BAD_REQUEST)
    const paymentDeleted = await paymentRepository.deletePaymentById(id)
    return notUndefinedOrNull(paymentDeleted)
  }

  static async createPayment(payment: IPayment) {
    const paymentCreated = await paymentRepository.createPayment(payment)
    return notUndefinedOrNull(paymentCreated)
  }
}