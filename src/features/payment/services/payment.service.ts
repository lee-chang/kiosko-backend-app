import { HttpStatus } from '../../../core/interfaces/httpStatus.interface'
import { IPayment, PaymentStatus } from '../interfaces/payment.interface'
import { PaymentRepository } from '../repositories/payment.repository'
import { notUndefinedOrNull } from '../../../core/service/exceptions/data-not-received.exception'
import { ErrorExt } from '../../../core/utils/http.response.util'
import { KeyPermissionsType } from '../../../core/interfaces/permissions'
import { PaymentBalanceService } from './payment-balance.service'

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
    const paymentUpdated = await paymentRepository.updatePaymentById(
      id,
      payment
    )

    if (!paymentUpdated)
      throw new ErrorExt('PAYMENT_NOT_EXIST', HttpStatus.BAD_REQUEST)

    if (
      payment.status &&
      payment.status === PaymentStatus.APPROVED &&
      paymentUpdated.status !== PaymentStatus.APPROVED
    ) {
      await PaymentBalanceService.discountPaymentFromBalance(
        paymentUpdated,
        paymentUpdated.balance
      )
    }

    if (
      payment.status &&
      payment.status !== PaymentStatus.APPROVED &&
      paymentUpdated.status === PaymentStatus.APPROVED
    ) {
      await PaymentBalanceService.addPaymentToBalance(
        paymentUpdated,
        paymentUpdated.balance
      )
    }

    return notUndefinedOrNull(paymentUpdated)
  }

  static async deletePaymentById(id: string) {
    const payment = await paymentRepository.findPaymentById(id)
    if (!payment) throw new ErrorExt('ROLE_NOT_EXIST', HttpStatus.BAD_REQUEST)

    // Update balance
    await PaymentBalanceService.removePaymentFromBalance(
      payment,
      payment.balance
    )

    const paymentDeleted = await paymentRepository.deletePaymentById(id)

    return notUndefinedOrNull(paymentDeleted)
  }

  static async createPayment(payment: IPayment) {
    const paymentCreated = await paymentRepository.createPayment(payment)

    // Update balance
    if (paymentCreated) {
      await PaymentBalanceService.addPaymentToBalance(
        paymentCreated,
        payment.balance
      )
    }

    return notUndefinedOrNull(paymentCreated)
  }

  // **  Utils

  static async sumAmountTotalPayments() {
    const { data: payments } = await paymentRepository.findAllPayments(
      1,
      Infinity
    )
    const total = payments.reduce((acc, credit) => {
      if (credit.status === PaymentStatus.APPROVED) {
        acc + credit.amount
      }
      return acc
    }, 0)

    return total
  }
}
