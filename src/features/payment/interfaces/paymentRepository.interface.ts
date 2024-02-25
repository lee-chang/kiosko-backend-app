import { PaginateData } from '../../../core/interfaces/resPaginate.interface'
import { IPayment } from './payment.interface'

export interface PaymentRepositoryPort {
  findAllPayments(page: number, limit: number): Promise<PaginateData<IPayment>>
  findPaymentById(id: string): Promise<IPayment | null>
  createPayment(payment: IPayment): Promise<IPayment | null>
  updatePaymentById(id: string, payment: IPayment): Promise<IPayment | null>
  deletePaymentById(id: string): Promise<Boolean>
}
