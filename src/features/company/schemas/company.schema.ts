import z from 'zod'
import { ICompany } from '../interfaces/company.interface'


const companySchema = z.object({
  id: z.string(),
  name: z.string().min(3).max(255),
  verified: z.boolean(),
  admin: z.string(),
  staff: z.array(z.string()),
  credit_total: z.number(),
  payment_total: z.number(),
  customer_top_balance: z.array(z.string()),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
}) satisfies z.ZodType<ICompany>

export const CompanySchema = {
  Create: companySchema.omit({ id: true, verified: true }),
  Update: companySchema.omit({ id: true }).partial(),
}
