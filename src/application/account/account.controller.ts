import { Command } from '../../infrastructure/messager/shared/command'
import { AccountService } from './account.service'

import { AccountCreatedMessageOut, AccountBalanceMessageOut } from '../../domain/account/messages'

export class AccountController {

  constructor(private readonly accountService: AccountService) {}
  
  createAccount(command: Command) {
    try {
      const userId = command.getUserId()
      this.accountService.createAccount(userId)
      return new AccountCreatedMessageOut(userId)
    } catch (error) {
      throw new Error(`could not create account : ${error.message}`)
    }
  }

  
  cash(command: Command) {
    try {
      const userId = command.getUserId()
      const cash = this.accountService.getCash(userId)
      return new AccountBalanceMessageOut(userId, cash)
    } catch (error) {
      throw new Error(`could not retrieve cash : ${error.message}`)
    }
  }
}


