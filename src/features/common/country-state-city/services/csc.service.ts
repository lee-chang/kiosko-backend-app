import { City, Country, State } from 'country-state-city'
import { notUndefinedOrNull } from '../../../../core/service/exceptions/data-not-received.exception'
import { ICity } from '../interfaces/city.interface'
import { ICountry } from '../interfaces/country.interface'
import { IState } from '../interfaces/state.interface'

export class CSCService {

  static getAllCountries(): ICountry[] {
    const countries = Country.getAllCountries()
    return notUndefinedOrNull(countries)
  }

  static getStatesOfCodeCountry(countryCode: string): IState[] {  
    const states = State.getStatesOfCountry(countryCode)
    return notUndefinedOrNull(states)
  }

  static getCitiesOfCodeState(countryCode: string, stateCode:string): ICity[] {
    const cities = City.getCitiesOfState(countryCode,stateCode)
    return notUndefinedOrNull(cities)
  }
}

