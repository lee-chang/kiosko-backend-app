import {
  PaginateData,
  initialPaginateData,
} from '../../../../core/interfaces/resPaginate.interface'
import { ICustomer } from '../../interfaces/customer.interface'
import { CustomerRepositoryPort } from '../../interfaces/customerRepository.interface'
import CustomerModel from './customer.model'

export class CustomerRepositoryMongoDB implements CustomerRepositoryPort {
  async createCustomer(customer: ICustomer) {
    const customerCreated = await CustomerModel.create(customer)
    return customerCreated
  }

  async findAllCustomers(page: number, limit: number, queryStr: string) {
    const total = await CustomerModel.countDocuments(JSON.parse(queryStr))
    
    const totalPages = Math.ceil(total / limit)

    const currentPage = page > totalPages ? totalPages : page || 1
    
    const customer = await CustomerModel.find()
      .limit(limit)
      .skip((page - 1) * limit)
      .where(JSON.parse(queryStr))
      .exec()

    if (!customer) {
      return initialPaginateData
    }

    let response: PaginateData<ICustomer> = {
      total: total,
      totalPages,
      currentPage,
      data: customer,
    }
    return response
  }

  async findCustomerById(id: string) {
    const customer = await CustomerModel.findById(id)
    if (!customer) {
      return null
    }
    return customer
  }

  async findCustomerByEmail(email: string) {
    const customer = await CustomerModel.findOne({ email })
    if (!customer) {
      return null
    }

    return customer
  }

  async updateCustomerById(id: string, customer: Partial<ICustomer>) {
    const updateUser = await CustomerModel.findByIdAndUpdate(id, customer, {
      new: true,
    })

    if (!updateUser) {
      return null
    }

    return updateUser
  }

  async deleteCustomerById(id: string) {
    const deleteUser = await CustomerModel.findByIdAndDelete(id)

    if (!deleteUser) {
      return false
    }
    return true
  }
}
