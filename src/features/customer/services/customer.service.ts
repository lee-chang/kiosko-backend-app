import { CustomerRepository } from '../repositories/customer.repository'
import { ICustomer } from '../interfaces/customer.interface'
import { notUndefinedOrNull } from '../../../core/service/exceptions/data-not-received.exception'

// import { addAbortSignal } from 'nodemailer/lib/xoauth2'

const customerRepository = new CustomerRepository()

export class CustomerService {
  private static customerRepository = customerRepository

  static async getCustomerById(id: string): Promise<ICustomer> {
    const customer = await this.customerRepository.findCustomerById(id)
    return notUndefinedOrNull(customer)
  }

  static async getAllCustomers(): Promise<ICustomer[]> {
    const users = await this.customerRepository.findAllCustomers()
    return users
  }

  static async updateCustomerById(id: string, customer: ICustomer): Promise<ICustomer> {
    const userUpdated = await this.customerRepository.updateCustomerById(id, customer)

    return notUndefinedOrNull(userUpdated)
  }

  static async deleteCustomerById(id: string): Promise<Boolean> {
    const userDeleted = await this.customerRepository.deleteCustomerById(id)
    return notUndefinedOrNull(userDeleted)
  }

  static async createCustomer(customer: ICustomer): Promise<ICustomer> {
    const userCreated = await this.customerRepository.createCustomer(customer)
    return notUndefinedOrNull(userCreated)
  }

  // ** UTILS

  static async isCustomerExistWithEmail(email: string): Promise<Boolean> {
    const userFount = await this.customerRepository.findCustomerByEmail(email)
    return userFount ? true : false
  }

  static async isCustomerExistWithId(id: string): Promise<Boolean> {
    const userFount = await this.customerRepository.findCustomerById(id)
    return userFount ? true : false
  }
}
