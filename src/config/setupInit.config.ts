// **  Scrip para crear los roles en la base de datos (SuperAdmin, Admin, Customer) **

import { IAuthCredentials } from '../features/auth/interfaces/auth.interface'
import { AuthUserService } from '../features/auth/services/auth-user.service'
import { ICompany } from '../features/company/interfaces/company.interface'
import { CompanyRepository } from '../features/company/repositories/company.repository'
import { IRole } from '../features/role/interfaces/role.interface'
import { RoleRepository } from '../features/role/repositories/role.repository'
import { TypePerson } from '../features/shared/interfaces/person.interface'
import { UserRoleService } from '../features/user/services/user-role.service'
import { UserService } from '../features/user/services/user.service'

const roleRepository = new RoleRepository()
const companyRepository = new CompanyRepository()

// ** Create First User SuperAdmin **
const userSuperAdmin: IAuthCredentials = {
  email: 'digitalee@admin.com',
  password: 'Digitalee1',
  userName: 'SuperAdmin',
}

// ** Template Role SuperAdmin && Customer**

const roleSuperAdmin: IRole = {
  id: '', // -> Se crea automaticamente
  name: 'SuperAdmin',
  description: 'Super Admin role',
  permissions: ['ALL_PERMISSIONS'],
  authorizations: [],
  by: TypePerson.user,
  users: [],
  isActive: true,
}

// Company Default
const companyDefault: ICompany = {
  name: 'Kiosko',
  admin: '',
  staff: [],
  id: '',
  verified: false,
  credit_total: 0,
  payment_total: 0,
}

//Setup SuperAdmin

const SetupAPP = async () => {
  try {
    const isUserSuperAdminDefault = await UserService.isUserExistWithEmail(
      userSuperAdmin.email
    )

    const isSuperAdmin = await roleRepository.findRoleByName('SuperAdmin')

    // Case 1 Existe el SuperAdmin por defecto

    if (isUserSuperAdminDefault) {
      console.log('---- USER SUPERADMIN DEFAULT ALREADY EXIST ----')
      console.log(
        '---- IF YOU DO NOT HAVE SUPER ADMIN ACCESS, DELETE THE USER DEFAULT FROM DB  ----'
      )
      return
    }

    // Case 2 Existe el rol SuperAdmin
    // Tiene usuarios el rol SuperAdmin
    if (isSuperAdmin && isSuperAdmin.users.length > 0) {
      console.log('SuperAdmin role already have users')
      return
    }

    // Case 3 No tiene usuarios el rol SuperAdmin, crear usuario y asignar rol

    if (isSuperAdmin && isSuperAdmin.users.length < 1) {
      await createSuperAdminDefault(isSuperAdmin.id)
      return 
    }

    // Case 4 No existe el rol SuperAdmin, crear rol y usuario
    if (!isSuperAdmin) {
      await createUserAndRoleSuperAdminDefault()
      return
    }

    // Tiene usuarios?
    if (isSuperAdmin) {
      await createSuperAdminDefault(isSuperAdmin.id)
      return
    }


    
  } catch (error) {
    console.log(error)
  }
}

async function createSuperAdminDefault(idSuperAdmin: string) {
  try {
    console.log('Creating SuperAdmin user ...')
    const user = await AuthUserService.createUser(userSuperAdmin)
    console.log('✅ SuperAdmin user created.')


    // Crear Company
    console.log('Creating Company ...')
    const company = await createCompanyDefault(user.user.id)
    console.log('✅ Company created.')

    // Asignar rol
    console.log('Assigning SuperAdmin role ...')
    const assignRole = await UserRoleService.updateUserRolesById(user.user.id, [
      idSuperAdmin,
    ])
    console.log('✅ SuperAdmin role assigned.')

    console.log('SuperAmin:', assignRole, user)
    return
  } catch (error) {
    console.log(error)
  }
}

async function createUserAndRoleSuperAdminDefault() {
  try {
    console.log('Creating new user ...')
    const user = await AuthUserService.createUser(userSuperAdmin)
    console.log('✅ SuperAdmin user created.')

    console.log('Creating SuperAdmin role ...')
    const role = await roleRepository.createRole(roleSuperAdmin)
    console.log('✅ SuperAdmin role created.')

    if (!role) {
      console.log('❌ SuperAdmin role not created')
      return
    }

    // Asignar rol
    console.log('Assigning SuperAdmin role ...')
    const assignRole = await UserRoleService.updateUserRolesById(user.user.id, [
      role.id,
    ])
    console.log('✅✅ SuperAdmin role assigned.')

    console.log('SuperAmin:', assignRole)

    // Crear Company
    console.log('Creating Company ...')
    const company = await createCompanyDefault(user.user.id)
    console.log('✅ Company created.')

    return
  } catch (error) {
    console.log(error)
  }
}


async function createCompanyDefault(idAdmin: string) {
  
  const dataCompany = {
    ...companyDefault,
    admin: idAdmin,
  }
  
  try {
    console.log('Creating Company ...')
    const company = await companyRepository.createCompany(dataCompany)
    console.log('✅ Company created.')
    return company
  } catch (error) {
    console.log(error)
  }
}

export default function setupInitial() {
  SetupAPP()
}
