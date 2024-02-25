import { ICredit } from '../../interfaces/credit.interface'
import { CreditModel } from './credit.model'
import { CreditRepositoryPort } from '../../interfaces/creditRepository.interface'
import {
  PaginateData,
  initialPaginateData,
} from '../../../../core/interfaces/resPaginate.interface'

export class CreditRepositoryMongoDB implements CreditRepositoryPort {
  async findAllCredits(
    page: number,
    limit: number
  ): Promise<PaginateData<ICredit>> {
    const totalCredits = await CreditModel.countDocuments()

    const totalPages = Math.ceil(totalCredits / limit)

    const currentPage = page > totalPages ? totalPages : page || 1

    const credits = await CreditModel.find()
      .limit(limit)
      .skip((page - 1) * limit)
      .exec()

    if (!credits) {
      return initialPaginateData
    }

    let response: PaginateData<ICredit> = {
      total: totalCredits,
      totalPages,
      currentPage,
      data: credits,
    }
    return response
  }

  async findCreditById(id: string) {
    const credit = await CreditModel.findById(id)
    return credit
  }

  async createCredit(credit: ICredit) {
    const newCredit = new CreditModel(credit)
    const creditCreated = await newCredit.save()
    return creditCreated
  }

  async updateCreditById(id: string, credit: ICredit) {
    const updateRol = await CreditModel.findByIdAndUpdate(id, credit, { new: true })
    return updateRol
  }

  async deleteCreditById(id: string) {
    const deleteCredit = await CreditModel.findByIdAndDelete(id)
    return deleteCredit ? true : false
  }
}
