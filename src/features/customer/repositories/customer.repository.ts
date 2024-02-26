import { IBalance } from '../../balance/interfaces/balance.interface'
import { ICustomer } from '../interfaces/customer.interface'
import { CustomerRepositoryPort } from '../interfaces/customerRepository.interface'
import { CustomerRepositoryMongoDB } from './mongoose/customer-mongo.repository'

export class CustomerRepository implements CustomerRepositoryPort {
  private customerRepository: CustomerRepositoryPort

  constructor() {
    this.customerRepository = new CustomerRepositoryMongoDB()
  }

  async createCustomer(customer: ICustomer) {
    return await this.customerRepository.createCustomer(customer)
  }

  async findAllCustomers(page: number, limit: number) {
    return await this.customerRepository.findAllCustomers(page, limit)
  }

  async findCustomerById(id: string) {
    return await this.customerRepository.findCustomerById(id)
  }

  async findCustomerByEmail(email: string) {
    return await this.customerRepository.findCustomerByEmail(email)
  }

  async updateCustomerById(id: string, customer: ICustomer) {
    return await this.customerRepository.updateCustomerById(id, customer)
  }

  async deleteCustomerById(id: string) {
    return await this.customerRepository.deleteCustomerById(id)
  }

 //** EXTRAS


}
