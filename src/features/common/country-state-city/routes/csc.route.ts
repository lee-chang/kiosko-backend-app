import { Router } from 'express'

// Controllers
import { CSCController } from '../controllers/csc.controller'

const router = Router()

// ** CRUD
router.get(
  '/countries',
  CSCController.getAllCountries
)

router.get(
  '/states/:countryCode',
  CSCController.getStatesByCodeCountry
)

router.get(
  '/cities/:countryCode/:stateCode',
  CSCController.getCitiesByCodeState
)


export default router
