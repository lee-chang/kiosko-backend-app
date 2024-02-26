import { PaginateData } from '../../../core/interfaces/resPaginate.interface'
import { ICustomer } from './customer.interface'

export interface CustomerRepositoryPort {
  createCustomer(user: ICustomer): Promise<ICustomer>
  findAllCustomers(
    page: number,
    limit: number
  ): Promise<PaginateData<ICustomer>>
  findCustomerById(id: string): Promise<ICustomer | null>
  findCustomerByEmail(email: string): Promise<ICustomer | null>
  updateCustomerById(id: string, user: ICustomer): Promise<ICustomer | null>
  deleteCustomerById(id: string): Promise<Boolean>
}
