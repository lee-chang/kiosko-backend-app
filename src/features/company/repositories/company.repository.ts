import { ICompany } from '../interfaces/company.interface'
import { CompanyRepositoryPort } from '../interfaces/companyRepository.interface'
import { CompanyRepositoryMongoDB } from './mongoose/company-mongo.repository'

export class CompanyRepository implements CompanyRepositoryPort {
  private companyRepository: CompanyRepositoryPort

  constructor() {
    this.companyRepository = new CompanyRepositoryMongoDB()
  }

  async createCompany(company: ICompany) {
    return await this.companyRepository.createCompany(company)
  }

  async findAllCompanies(page: number, limit: number) {
    return await this.companyRepository.findAllCompanies(page, limit)
  }

  async findCompanyById(id: string) {
    return await this.companyRepository.findCompanyById(id)
  }

  async updateCompanyById(id: string, company: ICompany) {
    return await this.companyRepository.updateCompanyById(id, company)
  }

  async deleteCompanyById(id: string) {
    return await this.companyRepository.deleteCompanyById(id)
  }
}
