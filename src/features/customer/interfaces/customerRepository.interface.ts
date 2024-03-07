import { PaginateData } from '../../../core/interfaces/resPaginate.interface'
import { ICustomer } from './customer.interface'

export interface CustomerRepositoryPort {
  createCustomer(customer: ICustomer): Promise<ICustomer>
  findAllCustomers(
    page: number,
    limit: number,
    queryStr: string
  ): Promise<PaginateData<ICustomer>>
  findCustomerById(id: string): Promise<ICustomer | null>
  findCustomerByEmail(email: string): Promise<ICustomer | null>
  updateCustomerById(id: string, customer: Partial<ICustomer>): Promise<ICustomer | null>
  deleteCustomerById(id: string): Promise<Boolean>
}
