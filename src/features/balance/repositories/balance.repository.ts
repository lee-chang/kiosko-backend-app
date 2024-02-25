import { BalanceRepositoryPort } from '../interfaces/balanceRepository.interface'
import { BalanceRepositoryMongoDB } from './mongoose/balance-mongo.repository'
import { IBalance } from '../interfaces/balance.interface'
import { PaginateData } from '../../../core/interfaces/resPaginate.interface'

export class BalanceRepository implements BalanceRepositoryPort {
  private balanceRepository: BalanceRepositoryPort

  constructor() {
    this.balanceRepository = new BalanceRepositoryMongoDB()
  }

  async findAllBalances(
    page: number,
    limit: number
  ): Promise<PaginateData<IBalance>> {
    return await this.balanceRepository.findAllBalances(page, limit)
  }

  async findBalanceById(id: string): Promise<IBalance | null> {
    return await this.balanceRepository.findBalanceById(id)
  }

  async createBalance(balance: IBalance): Promise<IBalance | null> {
    return await this.balanceRepository.createBalance(balance)
  }

  async updateBalanceById(id: string, balance: IBalance): Promise<IBalance | null> {
    return await this.balanceRepository.updateBalanceById(id, balance)
  }

  async deleteBalanceById(id: string): Promise<Boolean> {
    return await this.balanceRepository.deleteBalanceById(id)
  }
}
