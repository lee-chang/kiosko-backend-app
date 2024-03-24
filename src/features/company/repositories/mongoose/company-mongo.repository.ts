import { PaginateData, initialPaginateData } from '../../../../core/interfaces/resPaginate.interface'
import { ICompany } from '../../interfaces/company.interface'
import { CompanyRepositoryPort } from '../../interfaces/companyRepository.interface'
import CompanyModel from './company.model'

export class CompanyRepositoryMongoDB implements CompanyRepositoryPort {
  async createCompany(company: ICompany) {
    const companyCreated = await CompanyModel.create(company)
    return companyCreated
  }

  async findAllCompanies(    page: number,
    limit: number) {
      const totalCompanies = await CompanyModel.countDocuments()

      const totalPages = Math.ceil(totalCompanies / limit)
  
      const currentPage = page > totalPages ? totalPages : page || 1
  
      const companies = await CompanyModel.find()
        .limit(limit)
        .skip((page - 1) * limit)
        .exec()
  
      if (!companies) {
        return initialPaginateData
      }
  
      let response: PaginateData<ICompany> = {
        total: totalCompanies,
        totalPages,
        currentPage,
        data: companies,
      }
      return response
  }

  async findCompanyById(id: string) {
    const company = await CompanyModel.findById(id)
    if (!company) {
      return null
    }
    return company
  }

  async updateCompanyById(id: string, company: Partial<ICompany>) {
    const companyUpdated = await CompanyModel.findByIdAndUpdate(id, company, {
      new: true,
    })

    if (!companyUpdated) {
      return null
    }

    return companyUpdated
  }

  async deleteCompanyById(id: string) {
    const companyDeleted = await CompanyModel.findByIdAndDelete(id)

    if (!companyDeleted) {
      return false
    }
    return true
  }
}
