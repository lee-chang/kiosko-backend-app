import { CreditRepositoryPort } from '../interfaces/creditRepository.interface'
import { CreditRepositoryMongoDB } from './mongoose/credit-mongo.repository'
import { ICredit } from '../interfaces/credit.interface'
import { PaginateData } from '../../../core/interfaces/resPaginate.interface'

export class CreditRepository implements CreditRepositoryPort {
  private creditRepository: CreditRepositoryPort

  constructor() {
    this.creditRepository = new CreditRepositoryMongoDB()
  }

  async findAllCredits(
    page: number,
    limit: number
  ): Promise<PaginateData<ICredit>> {
    return await this.creditRepository.findAllCredits(page, limit)
  }

  async findCreditById(id: string): Promise<ICredit | null> {
    return await this.creditRepository.findCreditById(id)
  }

  async createCredit(credit: ICredit): Promise<ICredit | null> {
    return await this.creditRepository.createCredit(credit)
  }

  async updateCreditById(id: string, credit: Partial<ICredit>): Promise<ICredit | null> {
    return await this.creditRepository.updateCreditById(id, credit)
  }

  async deleteCreditById(id: string): Promise<Boolean> {
    return await this.creditRepository.deleteCreditById(id)
  }
}
