import { IBalance } from '../../interfaces/balance.interface'
import { BalanceModel } from './balance.model'
import { BalanceRepositoryPort } from '../../interfaces/balanceRepository.interface'
import {
  PaginateData,
  initialPaginateData,
} from '../../../../core/interfaces/resPaginate.interface'
import { ICustomer } from '../../../customer/interfaces/customer.interface'
import { IPayment } from '../../../payment/interfaces/payment.interface'

export class BalanceRepositoryMongoDB implements BalanceRepositoryPort {
  async findAllBalances(
    page: number,
    limit: number
  ): Promise<PaginateData<IBalance>> {
    const totalBalances = await BalanceModel.countDocuments()

    const totalPages = Math.ceil(totalBalances / limit)

    const currentPage = page > totalPages ? totalPages : page || 1

    const balances = await BalanceModel.find()
      .populate('customer', 'id name typeCustomer')
      .populate('payment', 'id amount status')
      .populate('credit', 'id amount status')
      .limit(limit)
      .skip((page - 1) * limit)
      .exec()

    if (!balances) {
      return initialPaginateData
    }

    let response: PaginateData<IBalance> = {
      total: totalBalances,
      totalPages,
      currentPage,
      data: balances,
    }
    return response
  }

  async findBalanceById(id: string) {
    const balance = await BalanceModel.findById(id)
      .populate('customer')
      .populate('payment')
      .populate('credit')      
      .exec()

    return balance
  }

  async createBalance(balance: IBalance) {
    const newBalance = new BalanceModel(balance)
    const balanceCreated = await newBalance.save()
    return balanceCreated
  }

  async updateBalanceById(id: string, balance: IBalance) {
    const updateRol = await BalanceModel.findByIdAndUpdate(id, balance, {
      new: true,
    })
    return updateRol
  }

  async deleteBalanceById(id: string) {
    const deleteBalance = await BalanceModel.findByIdAndDelete(id)
    return deleteBalance ? true : false
  }
}
