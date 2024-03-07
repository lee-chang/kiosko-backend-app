import { query } from 'express'
import { HttpStatus } from '../../../core/interfaces/httpStatus.interface'
import { PaginateData } from '../../../core/interfaces/resPaginate.interface'
import { notUndefinedOrNull } from '../../../core/service/exceptions/data-not-received.exception'
import { ErrorExt } from '../../../core/utils/http.response.util'
import { IBalance } from '../../balance/interfaces/balance.interface'
import { BalanceRepository } from '../../balance/repositories/balance.repository'
import { ICustomer } from '../interfaces/customer.interface'
import { CustomerRepository } from '../repositories/customer.repository'

// import { addAbortSignal } from 'nodemailer/lib/xoauth2'

const customerRepository = new CustomerRepository()
const balanceRepository = new BalanceRepository()

export class CustomerService {
  private static customerRepository = customerRepository
  private static balanceRepository = balanceRepository

  static async getCustomerById(id: string): Promise<ICustomer> {
    const customer = await this.customerRepository.findCustomerById(id)
    return notUndefinedOrNull(customer)
  }

  static async getAllCustomers(
    page: number,
    limit: number,
    queryStr: string
  ): Promise<PaginateData<ICustomer>> {
    const users = await this.customerRepository.findAllCustomers(
      page,
      limit,
      queryStr
    )
    return users
  }

  static async updateCustomerById(
    id: string,
    customer: ICustomer
  ): Promise<ICustomer> {
    console.log('id', id)
    console.log('customer', customer)

    const userUpdated = await this.customerRepository.updateCustomerById(
      id,
      customer
    )
    return notUndefinedOrNull(userUpdated)
  }

  static async deleteCustomerById(id: string): Promise<Boolean> {
    const customerDeleted = await this.customerRepository.deleteCustomerById(id)
    return notUndefinedOrNull(customerDeleted)
  }

  static async createCustomer(customer: ICustomer): Promise<ICustomer> {
    const customerCreated = await this.customerRepository.createCustomer(
      customer
    )
    const initialBalance: IBalance = {
      id: '',
      total: 0,
      customer: customerCreated.id,
      payment: [],
      credit: [],
    }

    const newBalance = await this.balanceRepository.createBalance(
      initialBalance
    )

    if (!newBalance)
      throw new ErrorExt(
        'BALANCE_NOT_CREATED',
        HttpStatus.INTERNAL_SERVER_ERROR
      )

    const customerUpdate = await this.customerRepository.updateCustomerById(
      customerCreated.id,
      { balance: newBalance.id}
    )

    if (!customerUpdate)
      throw new ErrorExt(
        'CUSTOMER_NOT_UPDATED',
        HttpStatus.INTERNAL_SERVER_ERROR
      )

    return notUndefinedOrNull(customerCreated)
  }

  // ** UTILS

  static async isCustomerExistWithEmail(email: string): Promise<Boolean> {
    const customerFount = await this.customerRepository.findCustomerByEmail(
      email
    )
    return customerFount ? true : false
  }

  static async isCustomerExistWithId(id: string): Promise<Boolean> {
    const customerFount = await this.customerRepository.findCustomerById(id)
    return customerFount ? true : false
  }
}
