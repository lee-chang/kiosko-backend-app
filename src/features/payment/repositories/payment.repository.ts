import { PaymentRepositoryPort } from '../interfaces/paymentRepository.interface'
import { PaymentRepositoryMongoDB } from './mongoose/payment-mongo.repository'
import { IPayment } from '../interfaces/payment.interface'
import { PaginateData } from '../../../core/interfaces/resPaginate.interface'

export class PaymentRepository implements PaymentRepositoryPort {
  private paymentRepository: PaymentRepositoryPort

  constructor() {
    this.paymentRepository = new PaymentRepositoryMongoDB()
  }

  async findAllPayments(
    page: number,
    limit: number
  ): Promise<PaginateData<IPayment>> {
    return await this.paymentRepository.findAllPayments(page, limit)
  }

  async findPaymentById(id: string): Promise<IPayment | null> {
    return await this.paymentRepository.findPaymentById(id)
  }

  async createPayment(payment: IPayment): Promise<IPayment | null> {
    return await this.paymentRepository.createPayment(payment)
  }

  async updatePaymentById(id: string, payment: IPayment): Promise<IPayment | null> {
    return await this.paymentRepository.updatePaymentById(id, payment)
  }

  async deletePaymentById(id: string): Promise<Boolean> {
    return await this.paymentRepository.deletePaymentById(id)
  }
}
