import { HttpStatus } from '../../../core/interfaces/httpStatus.interface'
import { CreditStatus, ICredit } from '../interfaces/credit.interface'
import { CreditRepository } from '../repositories/credit.repository'
import { notUndefinedOrNull } from '../../../core/service/exceptions/data-not-received.exception'
import { ErrorExt } from '../../../core/utils/http.response.util'
import { KeyPermissionsType } from '../../../core/interfaces/permissions'
import { CreditBalanceService } from './credit-balance.service'

const creditRepository = new CreditRepository()

export class CreditSevice {
  // ** CRUD

  static async findAllCredits(page: number, limit: number) {
    const credits = await creditRepository.findAllCredits(page, limit)
    return notUndefinedOrNull(credits)
  }

  static async findCreditById(id: string) {
    const credit = await creditRepository.findCreditById(id)
    return notUndefinedOrNull(credit)
  }

  static async updateCreditById(id: string, credit: Partial<ICredit>) {
    const creditUpdated = await creditRepository.updateCreditById(id, credit)

    if (!creditUpdated)
      throw new ErrorExt('CREDIT_NOT_EXIST', HttpStatus.BAD_REQUEST)

    if (
      credit.status &&
      credit.status === CreditStatus.APPROVED &&
      creditUpdated.status !== CreditStatus.APPROVED
    ) {
      await CreditBalanceService.decreaseCreditToBalance(
        creditUpdated,
        creditUpdated.balance
      )
    }

    if (
      credit.status &&
      credit.status !== CreditStatus.APPROVED &&
      creditUpdated.status === CreditStatus.APPROVED
    ) {
      await CreditBalanceService.increaseCreditToBalance(
        creditUpdated,
        creditUpdated.balance
      )
    }

    return notUndefinedOrNull(creditUpdated)
  }

  static async deleteCreditById(id: string) {
    const credit = await creditRepository.findCreditById(id)
    if (!credit) throw new ErrorExt('CREDIT_NOT_EXIST', HttpStatus.BAD_REQUEST)

    // Update balance
    await CreditBalanceService.removeCreditFromBalance(credit, credit.balance)

    // Delete credit
    const creditDeleted = await creditRepository.deleteCreditById(id)

    return notUndefinedOrNull(creditDeleted)
  }

  static async createCredit(credit: ICredit) {
    const creditCreated = await creditRepository.createCredit(credit)

    // Update balance
    if (creditCreated) {
      await CreditBalanceService.addCreditToBalance(
        creditCreated,
        credit.balance
      )
    }

    return notUndefinedOrNull(creditCreated)
  }

  // ** Utils

  // Sum Total Credits

  static async sumAmountTotalCredits() {
    const { data: credits } = await creditRepository.findAllCredits(1, Infinity)
    // Is available all credits in status approved, ot use reduce

    const total = credits.reduce((acc, credit) => {
      if (credit.status === CreditStatus.APPROVED) {
        acc + credit.amount
      }
      return acc
    }, 0)

    return total

  }
}
