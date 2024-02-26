import { NextFunction, Request, Response } from 'express'
import { HttpStatus } from '../../../../core/interfaces/httpStatus.interface'
import { CSCService } from "../services/csc.service"


export class CSCController {
  static async getAllCountries(req: Request, res: Response, next: NextFunction) {
    try {
      const countries = CSCService.getAllCountries()
      return res.status(HttpStatus.OK).send(countries)
    } catch (err) {
      next(err)
    }
  }

  static async getStatesByCodeCountry(req: Request, res: Response, next: NextFunction) {
    const { countryCode } = req.params
    try {
      const states = CSCService.getStatesOfCodeCountry(countryCode)
      return res.status(HttpStatus.OK).send(states)
    } catch (err) {
      next(err)
    }
  }

  static async getCitiesByCodeState(req: Request, res: Response, next: NextFunction) {
    const { countryCode,stateCode } = req.params
    try {
      const cities = CSCService.getCitiesOfCodeState(countryCode,stateCode)
      return res.status(HttpStatus.OK).send(cities)
    } catch (err) {
      next(err)
    }
  }
}