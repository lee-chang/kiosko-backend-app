import { Request, Response, NextFunction } from 'express'
import { HttpStatus } from '../../../core/interfaces/httpStatus.interface'
import { BalanceSevice } from '../services/balance.service'
import { IBalance } from '../interfaces/balance.interface'
import { KeyPermissionsType } from '../../../core/interfaces/permissions'

export class BalanceController {
  static async getBalances(req: Request, res: Response, next: NextFunction) {
    let page = Number(req.query.page) || 1
    let limit = Number(req.query.limit) || Infinity

    try {
      const balances = await BalanceSevice.findAllBalances(page, limit)
      res.status(HttpStatus.OK).json(balances)
    } catch (err) {
      next(err)
    }
  }

  static async getBalance(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params
    try {
      const balance = await BalanceSevice.findBalanceById(id)
      res.status(HttpStatus.OK).json(balance)
    } catch (err) {
      next(err)
    }
  }

    static async createBalance(req: Request, res: Response, next: NextFunction) {
    const balance: IBalance = req.body
    try {
      const newBalance = await BalanceSevice.createBalance(balance)
      res.status(HttpStatus.OK).json(newBalance)
    } catch (err) {
      next(err)
    }
  }

  static async deleteBalance(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params
    try {
      const balance = await BalanceSevice.deleteBalanceById(id)
      res.status(HttpStatus.OK).json(balance)
    } catch (err) {
      next(err)
    }
  }

  static async updateBalance(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params
    const balance: IBalance = req.body
    try {
      const updateBalance = await BalanceSevice.updateBalanceById(id, balance)
      res.status(HttpStatus.OK).json(updateBalance)
    } catch (err) {
      next(err)
    }
  }
}
