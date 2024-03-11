import { ErrorExt } from '../../../core/utils/http.response.util'
import { BalanceRepository } from '../../balance/repositories/balance.repository'
import { IPayment } from '../interfaces/payment.interface'
import { PaymentRepository } from '../repositories/payment.repository'

const paymentRepository = new PaymentRepository()
const balanceRepository = new BalanceRepository()

export class PaymentBalanceService {
  static async addPaymentToBalance(payment: IPayment, idBalance: string) {
    const balance = await balanceRepository.findBalanceById(idBalance)

    if (!balance) {
      throw new ErrorExt('BALANCE_NOT_EXIST')
    }

    balance.payment.push(payment.id)
    balance.total_payment = (balance.total_payment || 0) + (payment.amount || 0)

    balance.total = (balance.total || 0) - (payment.amount || 0)

    const balanceUpdated = await balanceRepository.updateBalanceById(
      idBalance,
      balance
    )



    return balanceUpdated
  }

  static async removePaymentFromBalance(payment: IPayment, idBalance: string) {
    const balance = await balanceRepository.findBalanceById(idBalance)

    if (!balance) {
      throw new ErrorExt('BALANCE_NOT_EXIST')
    }

    balance.payment = balance.payment.filter((cr) => cr !== payment.id)

    balance.total_payment = (balance.total_payment || 0) - (payment.amount || 0)

    balance.total = (balance.total || 0) + (payment.amount || 0)

    const balanceUpdated = await balanceRepository.updateBalanceById(
      idBalance,
      balance
    )

    return balanceUpdated
  }


  // Solo descontar el pago del balance sin eliminar el pago
  static async discountPaymentFromBalance(payment: IPayment, idBalance: string) {
    const balance = await balanceRepository.findBalanceById(idBalance)

    if (!balance) {
      throw new ErrorExt('BALANCE_NOT_EXIST')
    }

    balance.total_payment = (balance.total_payment || 0) - (payment.amount || 0)
  
    balance.total = (balance.total || 0) + (payment.amount || 0)

    const balanceUpdated = await balanceRepository.updateBalanceById(
      idBalance,
      balance
    )

    return balanceUpdated
  }

  static async increasePaymentToBalance(payment: IPayment, idBalance: string) {
    const balance = await balanceRepository.findBalanceById(idBalance)

    if (!balance) {
      throw new ErrorExt('BALANCE_NOT_EXIST')
    }

    balance.total_payment = (balance.total_payment || 0) + (payment.amount || 0)

    balance.total = (balance.total || 0) - (payment.amount || 0)

    const balanceUpdated = await balanceRepository.updateBalanceById(
      idBalance,
      balance
    )

    return balanceUpdated
  }


  // Solo agregar el pago al balance sin agregar el pago

  static async decreasePaymentToBalance(
    payment: IPayment,
    idBalance: string
  ) {
    const balance = await balanceRepository.findBalanceById(idBalance)
    if (!balance) {
      throw new ErrorExt('BALANCE_NOT_EXIST')
    }

    balance.total_payment = (balance.total_payment || 0) - (payment.amount || 0)

    balance.total = (balance.total || 0) + (payment.amount || 0)

    const balanceUpdated = await balanceRepository.updateBalanceById(
      idBalance,
      balance
    )

    return balanceUpdated
  }





}
