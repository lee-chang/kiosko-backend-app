import { IPayment } from '../../interfaces/payment.interface'
import { PaymentModel } from './payment.model'
import { PaymentRepositoryPort } from '../../interfaces/paymentRepository.interface'
import {
  PaginateData,
  initialPaginateData,
} from '../../../../core/interfaces/resPaginate.interface'

export class PaymentRepositoryMongoDB implements PaymentRepositoryPort {
  async findAllPayments(
    page: number,
    limit: number
  ): Promise<PaginateData<IPayment>> {
    const totalPayments = await PaymentModel.countDocuments()

    const totalPages = Math.ceil(totalPayments / limit)

    const currentPage = page > totalPages ? totalPages : page || 1

    const payments = await PaymentModel.find()
      .populate('staff', 'id name userName')
      .populate('customer', 'id name')
      .limit(limit)
      .skip((page - 1) * limit)
      .exec()

    if (!payments) {
      return initialPaginateData
    }

    let response: PaginateData<IPayment> = {
      total: totalPayments,
      totalPages,
      currentPage,
      data: payments,
    }
    return response
  }

  async findPaymentById(id: string) {
    const payment = await PaymentModel.findById(id)
      .populate('staff', 'id name userName')
      .populate('customer')
    return payment
  }

  async createPayment(payment: IPayment) {
    const newPayment = new PaymentModel(payment)
    const paymentCreated = await newPayment.save()
    return paymentCreated
  }

  async updatePaymentById(id: string, payment: IPayment) {
    const updateRol = await PaymentModel.findByIdAndUpdate(id, payment, {
      new: true,
    })
    return updateRol
  }

  async deletePaymentById(id: string) {
    const deletePayment = await PaymentModel.findByIdAndDelete(id)
    return deletePayment ? true : false
  }
}
