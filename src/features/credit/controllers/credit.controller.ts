import { Request, Response, NextFunction } from 'express'
import { HttpStatus } from '../../../core/interfaces/httpStatus.interface'
import { CreditSevice } from '../services/credit.service'
import { ICredit } from '../interfaces/credit.interface'
import { KeyPermissionsType } from '../../../core/interfaces/permissions'

export class CreditController {
  static async getCredits(req: Request, res: Response, next: NextFunction) {
    let page = Number(req.query.page) || 1
    let limit = Number(req.query.limit) || Infinity

    try {
      const credits = await CreditSevice.findAllCredits(page, limit)
      res.status(HttpStatus.OK).json(credits)
    } catch (err) {
      next(err)
    }
  }

  static async getCredit(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params
    try {
      const credit = await CreditSevice.findCreditById(id)
      res.status(HttpStatus.OK).json(credit)
    } catch (err) {
      next(err)
    }
  }

    static async createCredit(req: Request, res: Response, next: NextFunction) {
    const credit: ICredit = req.body
    try {
      const newCredit = await CreditSevice.createCredit(credit)
      res.status(HttpStatus.OK).json(newCredit)
    } catch (err) {
      next(err)
    }
  }

  static async deleteCredit(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params
    try {
      const credit = await CreditSevice.deleteCreditById(id)
      res.status(HttpStatus.OK).json(credit)
    } catch (err) {
      next(err)
    }
  }

  static async updateCredit(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params
    const credit: ICredit = req.body
    try {
      const updateCredit = await CreditSevice.updateCreditById(id, credit)
      res.status(HttpStatus.OK).json(updateCredit)
    } catch (err) {
      next(err)
    }
  }
}
