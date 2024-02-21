import z from 'zod'
import { ICompany } from '../interfaces/company.interface'


const companySchema = z.object({
  id: z.string(),
  name: z.string().min(3).max(255),
  verified: z.boolean(),
  admin: z.string(),
}) satisfies z.ZodType<ICompany>

export const CompanySchema = {
  Create: companySchema.omit({ id: true, verified: true }),
  Update: companySchema.omit({ id: true }).partial(),
}
