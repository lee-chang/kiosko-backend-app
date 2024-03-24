import { notUndefinedOrNull } from '../../../core/service/exceptions/data-not-received.exception'
import { UserRepository } from '../../user/repositories/user.repository'
import { ICompany } from '../interfaces/company.interface'
import { CompanyRepository } from '../repositories/company.repository'


const companyRepository = new CompanyRepository()
const userRepository = new UserRepository()

export class CompanyService {
  private static companyRepository = companyRepository
  private static userRepository = userRepository

  static async getCompanyById(id: string) {
    const company = await this.companyRepository.findCompanyById(id)
    return notUndefinedOrNull(company)
  }

  static async getAllCompanies(page: number,
    limit: number) {
    const companies = await this.companyRepository.findAllCompanies(page, limit)
    return companies
  }

  static async updateCompanyById(id: string, company: ICompany) {

    const companyUpdated = await this.companyRepository.updateCompanyById(id, company)

    return notUndefinedOrNull(companyUpdated)
  }

  static async deleteCompanyById(id: string) {
    const companyDeleted = await this.companyRepository.deleteCompanyById(id)
    return notUndefinedOrNull(companyDeleted)
  }

  static async createCompany(company: ICompany) {
    const companyCreated = await this.companyRepository.createCompany(company)

    // update User with company

    const user = await this.userRepository.updateUserById(company.admin, { company: companyCreated.id })

    if (!user) {
      await this.companyRepository.deleteCompanyById(companyCreated.id)
      return null
    }

    return notUndefinedOrNull(companyCreated)
  }


  // ** UTILS

}
