import { IAddress } from './address.interface'
import { IPhone } from './phone.interface'

interface IPerson {
  firstName: string
  lastName: string
  identificationType: IdentificationType
  identification: string
  birthDate?: Date
  phone?: IPhone[]
  address?: IAddress[]
}

enum IdentificationType {
  dni = 'DNI',
  ruc = 'RUC',
  passport = 'PASAPORTE',
  foreign_license = 'CARNET EXTRANJERIA',
  other = 'OTRO',
}

enum TypePerson {
  user = 'system', // -> is a user of the system (admin, operator, manager, etc)
  customer = 'user', // ->  is a customer of the system (client)
}

const typePerson = {
  ...TypePerson,
}

type KeyTypePerson = keyof typeof TypePerson

export { IdentificationType, TypePerson, type KeyTypePerson, type IPerson }
