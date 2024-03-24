import { notUndefinedOrNull } from '../../../core/service/exceptions/data-not-received.exception'
import { PaymentStatus } from '../../payment/interfaces/payment.interface'
import { PaymentRepository } from '../../payment/repositories/payment.repository'
import { CompanyRepository } from '../repositories/company.repository'

const paymentRepository = new PaymentRepository()

const companyRepository = new CompanyRepository()

export class CompanyPaymentService {
  // SUM CREDITS BY COMPANY AND ADD TO COMPANY CREDIT TOTAL

  static async sumPaymentsByCompany(companyId: string) {
    const { data: payments } = await paymentRepository.findAllPayments(1, Infinity)
    // Is available all payments in status approved, ot use reduce

    let total = 0
    payments.forEach((payment) => {
      if (payment.status === PaymentStatus.APPROVED) {
        total += payment.amount
      }
    })

    const companyUpdated = await companyRepository.updateCompanyById(
      companyId,
      { payment_total: total }
    )

    return notUndefinedOrNull(companyUpdated)
  }
}
