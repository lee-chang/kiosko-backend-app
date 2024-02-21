import { PaginateData } from "../../../core/interfaces/resPaginate.interface"
import { ICompany } from "./company.interface"

export interface CompanyRepositoryPort {
  createCompany(user: ICompany): Promise<ICompany>
  findAllCompanies(page: number, limit: number): Promise<PaginateData<ICompany>>
  findCompanyById(id: string): Promise<ICompany | null>
  updateCompanyById(id: string, user: ICompany): Promise<ICompany | null>
  deleteCompanyById(id: string): Promise<Boolean>
}