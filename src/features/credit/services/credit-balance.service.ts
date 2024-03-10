import { BalanceRepository } from "../../balance/repositories/balance.repository"
import { CreditRepository } from "../repositories/credit.repository"


const creditRepository = new CreditRepository()
const balanceRepository = new BalanceRepository()

export class CreditBalanceService {
  static async AddCreditToBalance(idCredit: string, idBalance: string) {
    const balance = await balanceRepository.findBalanceById(idBalance)

    if (!balance) {
      throw new Error('BALANCE_NOT_EXIST')
    }

    balance.credit.push(idCredit)

    const balanceUpdated = await balanceRepository.updateBalanceById(idBalance, balance)

    return balanceUpdated
  }
}