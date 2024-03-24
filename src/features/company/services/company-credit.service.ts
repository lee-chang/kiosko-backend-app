import { notUndefinedOrNull } from '../../../core/service/exceptions/data-not-received.exception'
import { CreditStatus } from '../../credit/interfaces/credit.interface'
import { CreditRepository } from '../../credit/repositories/credit.repository'
import { CompanyRepository } from '../repositories/company.repository'

const creditRepository = new CreditRepository()

const companyRepository = new CompanyRepository()

export class CompanyCreditService {
  // SUM CREDITS BY COMPANY AND ADD TO COMPANY CREDIT TOTAL

  static async sumCreditsByCompany(companyId: string) {
    const { data: credits } = await creditRepository.findAllCredits(1, Infinity)
    // Is available all credits in status approved, ot use reduce

    let total = 0
    credits.forEach((credit) => {
      if (credit.status === CreditStatus.APPROVED) {
        total += credit.amount
      }
    })

    const companyUpdated = await companyRepository.updateCompanyById(
      companyId,
      { credit_total: total }
    )

    return notUndefinedOrNull(companyUpdated)
  }
}
