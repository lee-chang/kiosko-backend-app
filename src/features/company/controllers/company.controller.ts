import { NextFunction, Request, Response } from 'express'
import { HttpStatus } from '../../../core/interfaces/httpStatus.interface'
import { CompanyService } from '../services/company.service'
import { CompanyCreditService } from '../services/company-credit.service'
import { CompanyPaymentService } from '../services/company-payment.service'

export class CompanyControlller {

  static async createCompany(req: Request, res: Response,next:NextFunction) {
    const company = req.body
    try {
      const companyCreated = await CompanyService.createCompany(company)
      return res.status(HttpStatus.CREATED).send(companyCreated)
    } catch (err) {
      next(err)
    }
  }

  static async getCompanies(req: Request, res: Response,next:NextFunction) {
    let page = Number(req.query.page) || 1
    let limit = Number(req.query.limit) || Infinity

    try {
      const companies = await CompanyService.getAllCompanies(page, limit)
      return res.status(HttpStatus.OK).send(companies)
    } catch (err) {
      // console.log(err)
      next(err)
    }
  }

  static async getCompany(req: Request, res: Response,next:NextFunction) {
    const { id } = req.params

    try {
      const company = await CompanyService.getCompanyById(id)
      return res.status(HttpStatus.OK).send(company)
    } catch (err) {
      next(err)
    }
  }

  static async updateCompany(req: Request, res: Response,next:NextFunction) {
    const { id } = req.params
    const company = req.body
    try {
      const companyUpdated = await CompanyService.updateCompanyById(id, company)
      return res.status(HttpStatus.OK).send(companyUpdated)
    } catch (err) {
      next(err)
    }
  }

  static async deleteCompany(req: Request, res: Response,next:NextFunction) {
    const { id } = req.params
    try {
      const companyDeleted = await CompanyService.deleteCompanyById(id)
      return res.status(HttpStatus.OK).send(companyDeleted)
    } catch (err) {
      next(err)
    }
  }


  // ** ORM COMPANY CREDIT AND PAYMENT

  static async syncCreditsTotal(req: Request, res: Response,next:NextFunction) {
    const { id } = req.params
    try {
      const companyUpdated = await CompanyCreditService.sumCreditsByCompany(id)
      return res.status(HttpStatus.OK).send(companyUpdated)
    } catch (err) {
      next(err)
    }
  }

  static async syncPaymentsTotal(req: Request, res: Response,next:NextFunction) {
    const { id } = req.params
    try {
      const companyUpdated = await CompanyPaymentService.sumPaymentsByCompany(id)
      return res.status(HttpStatus.OK).send(companyUpdated)
    } catch (err) {
      next(err)
    }
  }
}
