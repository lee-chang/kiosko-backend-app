import { ErrorExt } from '../../../core/utils/http.response.util'
import { BalanceRepository } from '../../balance/repositories/balance.repository'
import { ICredit } from '../interfaces/credit.interface'
import { CreditRepository } from '../repositories/credit.repository'

const creditRepository = new CreditRepository()
const balanceRepository = new BalanceRepository()

export class CreditBalanceService {
  static async addCreditToBalance(credit: ICredit, idBalance: string) {
    const balance = await balanceRepository.findBalanceById(idBalance)

    if (!balance) {
      throw new ErrorExt('BALANCE_NOT_EXIST')
    }

    balance.total_credit = (balance.total_credit || 0) + (credit.amount || 0)

    balance.total = (balance.total || 0) + (credit.amount || 0)

    balance.credit.push(credit.id)

    const balanceUpdated = await balanceRepository.updateBalanceById(
      idBalance,
      balance
    )

    return balanceUpdated
  }

  static async removeCreditFromBalance(credit: ICredit, idBalance: string) {
    const balance = await balanceRepository.findBalanceById(idBalance)

    if (!balance) {
      throw new ErrorExt('BALANCE_NOT_EXIST')
    }

    balance.credit = balance.credit.filter((cr) => cr !== credit.id)

    balance.total_credit = (balance.total_credit || 0) - (credit.amount || 0)

    balance.total = (balance.total || 0) - (credit.amount || 0)

    const balanceUpdated = await balanceRepository.updateBalanceById(
      idBalance,
      balance
    )

    return balanceUpdated
  }

  static async increaseCreditToBalance(credit: ICredit, idBalance: string) {
    const balance = await balanceRepository.findBalanceById(idBalance)

    if (!balance) {
      throw new ErrorExt('BALANCE_NOT_EXIST')
    }

    balance.total_credit = (balance.total_credit || 0) + (credit.amount || 0)

    balance.total = (balance.total || 0) + (credit.amount || 0)

    const balanceUpdated = await balanceRepository.updateBalanceById(
      idBalance,
      balance
    )

    return balanceUpdated
  }

  // Solo agregar el credito al balance sin agregar el credito
  static async decreaseCreditToBalance(
    credit: ICredit,
    idBalance: string
  ) {
    const balance = await balanceRepository.findBalanceById(idBalance)
    if (!balance) {
      throw new ErrorExt('BALANCE_NOT_EXIST')
    }

    balance.total_credit = (balance.total_credit || 0) - (credit.amount || 0)

    balance.total = (balance.total || 0) - (credit.amount || 0)

    const balanceUpdated = await balanceRepository.updateBalanceById(
      idBalance,
      balance
    )

    return balanceUpdated
  }
}
