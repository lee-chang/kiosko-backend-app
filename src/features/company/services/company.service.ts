import { notUndefinedOrNull } from '../../../core/service/exceptions/data-not-received.exception'
import { ICompany } from '../interfaces/company.interface'
import { CompanyRepository } from '../repositories/company.repository'


const companyRepository = new CompanyRepository()

export class CompanyService {
  private static companyRepository = companyRepository

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
    return notUndefinedOrNull(companyCreated)
  }


  // ** UTILS

}
