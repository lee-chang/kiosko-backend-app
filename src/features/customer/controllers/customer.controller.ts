import { NextFunction, Request, Response } from 'express'
import { HttpStatus } from '../../../core/interfaces/httpStatus.interface'
import { CustomerService } from '../services/customer.service'
import { ICustomer } from '../interfaces/customer.interface'

export class CustomerControlller {

  static async createCustomer(req: Request, res: Response,next:NextFunction) {
    const customer = req.body
    try {
      const customerCreated = await CustomerService.createCustomer(customer)
      return res.status(HttpStatus.CREATED).send(customerCreated)
    } catch (err) {
      next(err)
    }
  }

  static async getCustomers(req: Request, res: Response,next:NextFunction) {
    let page = Number(req.query.page) || 1
    let limit = Number(req.query.limit) || Infinity
    
    try {
      const customers = await CustomerService.getAllCustomers(page, limit)
      return res.status(HttpStatus.OK).send(customers)
    } catch (err) {
      // console.log(err)
      next(err)
    }
  }

  static async getCustomer(req: Request, res: Response,next:NextFunction) {
    const { id } = req.params

    try {
      const customer = await CustomerService.getCustomerById(id)
      return res.status(HttpStatus.OK).send(customer)
    } catch (err) {
      next(err)
    }
  }

  static async updateCustomer(req: Request, res: Response,next:NextFunction) {
    const { id } = req.params
    const customer: ICustomer = req.body
    try {
      const customerUpdated = await CustomerService.updateCustomerById(id, customer)
      return res.status(HttpStatus.OK).send(customerUpdated)
    } catch (err) {
      next(err)
    }
  }

  static async deleteCustomer(req: Request, res: Response,next:NextFunction) {
    const { id } = req.params
    try {
      const customerDeleted = await CustomerService.deleteCustomerById(id)
      return res.status(HttpStatus.OK).send(customerDeleted)
    } catch (err) {
      next(err)
    }
  }

}
