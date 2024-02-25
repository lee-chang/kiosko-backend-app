import { PaginateData } from '../../../core/interfaces/resPaginate.interface'
import { ICredit } from './credit.interface'

export interface CreditRepositoryPort {
  findAllCredits(page: number, limit: number): Promise<PaginateData<ICredit>>
  findCreditById(id: string): Promise<ICredit | null>
  createCredit(credit: ICredit): Promise<ICredit | null>
  updateCreditById(id: string, credit: ICredit): Promise<ICredit | null>
  deleteCreditById(id: string): Promise<Boolean>
}
