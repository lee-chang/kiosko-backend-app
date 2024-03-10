import { BalanceRepository } from '../../balance/repositories/balance.repository'
import { ICredit } from '../interfaces/credit.interface'
import { CreditRepository } from '../repositories/credit.repository'

const creditRepository = new CreditRepository()
const balanceRepository = new BalanceRepository()

export class CreditBalanceService {
  static async addCreditToBalance(credit: ICredit, idBalance: string) {
    const balance = await balanceRepository.findBalanceById(idBalance)

    if (!balance) {
      throw new Error('BALANCE_NOT_EXIST')
    }

    balance.credit.push(credit.id)
    balance.total_credit = (balance.total_credit || 0) + (credit.amount || 0)

    const balanceUpdated = await balanceRepository.updateBalanceById(
      idBalance,
      balance
    )

    return balanceUpdated
  }

  static async removeCreditFromBalance(credit: ICredit, idBalance: string) {
    const balance = await balanceRepository.findBalanceById(idBalance)

    if (!balance) {
      throw new Error('BALANCE_NOT_EXIST')
    }

    balance.credit = balance.credit.filter((cr) => cr !== credit.id)

    balance.total_credit = (balance.total_credit || 0) - (credit.amount || 0)

    const balanceUpdated = await balanceRepository.updateBalanceById(
      idBalance,
      balance
    )

    return balanceUpdated
  }
}
