import { AccountStore } from '../../infrastructure/store/account/account-store'
import { Account } from '../../domain/account/account'

export class AccountService {

  constructor(private readonly accountStore: AccountStore){}

  createAccount(userId: string) {
    const existingAccount = this.accountStore.load(userId)
    
    if (existingAccount) {
      throw new Error(`account for ${userId} already exist`)
    }

    const account = new Account(userId, 100000)

    this.accountStore.save(account)
  }

  getCash(userId: string) {
    const account = this.accountStore.load(userId)
    
    if (!account) {
      throw new Error(`no account found for ${userId}`)
    }

    return account.cash
  }

}