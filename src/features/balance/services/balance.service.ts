import { HttpStatus } from '../../../core/interfaces/httpStatus.interface'
import { IBalance } from '../interfaces/balance.interface'
import { BalanceRepository } from '../repositories/balance.repository'
import { notUndefinedOrNull } from '../../../core/service/exceptions/data-not-received.exception'
import { ErrorExt } from '../../../core/utils/http.response.util'
import { KeyPermissionsType } from '../../../core/interfaces/permissions'

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
    const balanceUpdated = await balanceRepository.updateBalanceById(id, balance)
    return notUndefinedOrNull(balanceUpdated)
  }

  static async deleteBalanceById(id: string) {
    const balance = await balanceRepository.findBalanceById(id)
    if (!balance) throw new ErrorExt('BALANCE_NOT_EXIST', HttpStatus.BAD_REQUEST)
    const balanceDeleted = await balanceRepository.deleteBalanceById(id)
    return notUndefinedOrNull(balanceDeleted)
  }

  static async createBalance(balance: IBalance) {
    const balanceCreated = await balanceRepository.createBalance(balance)
    return notUndefinedOrNull(balanceCreated)
  }
}