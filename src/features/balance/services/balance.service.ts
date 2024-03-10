import { HttpStatus } from '../../../core/interfaces/httpStatus.interface'
import { IBalance } from '../interfaces/balance.interface'
import { BalanceRepository } from '../repositories/balance.repository'
import { notUndefinedOrNull } from '../../../core/service/exceptions/data-not-received.exception'
import { ErrorExt } from '../../../core/utils/http.response.util'
import { KeyPermissionsType } from '../../../core/interfaces/permissions'
import { ICustomer } from '../../customer/interfaces/customer.interface'
import { IPayment } from '../../payment/interfaces/payment.interface'
import { CreditStatus, ICredit } from '../../credit/interfaces/credit.interface'

const balanceRepository = new BalanceRepository()

export class BalanceSevice {
  // ** CRUD

  static async findAllBalances(page: number, limit: number) {
    const balances = await balanceRepository.findAllBalances(page, limit)
    return notUndefinedOrNull(balances)
  }

  static async findBalanceById(id: string) {
    const balance = await balanceRepository.findBalanceById(id)
    return notUndefinedOrNull(balance)
  }

  static async updateBalanceById(id: string, balance: IBalance) {
    const balanceUpdated = await balanceRepository.updateBalanceById(
      id,
      balance
    )
    return notUndefinedOrNull(balanceUpdated)
  }

  static async deleteBalanceById(id: string) {
    const balance = await balanceRepository.findBalanceById(id)
    if (!balance)
      throw new ErrorExt('BALANCE_NOT_EXIST', HttpStatus.BAD_REQUEST)
    const balanceDeleted = await balanceRepository.deleteBalanceById(id)
    return notUndefinedOrNull(balanceDeleted)
  }

  static async createBalance(balance: IBalance) {
    const balanceCreated = await balanceRepository.createBalance(balance)
    return notUndefinedOrNull(balanceCreated)
  }

  // Extra methods
  static async updateTotalBalance(id: string) {
    const balance = await balanceRepository.findBalanceById(id)
    if (!balance)
      throw new ErrorExt('BALANCE_NOT_EXIST', HttpStatus.BAD_REQUEST)

    // contar el total de los pagos y creditos

    // la variable total debe sumar todos los creditos y restar todos los pagos

    // Solo es valido los creditos que esten en estado de "pendiente" y los pagos que esten en estado de "pendiente"

    const tBalance = balance as {
      customer: ICustomer
      payment: IPayment[]
      credit: ICredit[]
    } & IBalance 

    let totalCredit = 0
    let totalPayment = 0

    // sumar todos los creditos
    tBalance.credit.forEach((credit) => {
      if ( typeof credit === 'object'){
        if (credit.status === CreditStatus.APPROVED) {
          totalCredit += credit.amount
        }      
      }  
    })

    // sumar todos los pagos
    tBalance.payment.forEach((payment) => {
      if ( typeof payment === 'object'){
        if (payment.status) {
          totalPayment += payment.amount
        }
      }
    })

    return balance.total
  }
}
