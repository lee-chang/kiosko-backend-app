import { PaginateData } from '../../../core/interfaces/resPaginate.interface'
import { IBalance } from './balance.interface'

export interface BalanceRepositoryPort {
  findAllBalances(page: number, limit: number): Promise<PaginateData<IBalance>>
  findBalanceById(id: string): Promise<IBalance | null>
  createBalance(balance: IBalance): Promise<IBalance | null>
  updateBalanceById(id: string, balance: IBalance): Promise<IBalance | null>
  deleteBalanceById(id: string): Promise<Boolean>
}
