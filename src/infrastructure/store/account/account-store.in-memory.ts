import { Account } from '../../../domain/account'
import { AccountStore } from './account-store'

export class AccountStoreInMemory implements AccountStore {
  
  private storage: { userId: string, cash: number }[] = [] 

  load(userId: string): Account | undefined {
    const account = this.storage.find(dbAccount => dbAccount.userId === userId)
    
    if (!account) {
      return;
    }

    return new Account(account.userId, account.cash)
  }
  
  save(account: Account) {
    const storedAccount = this.storage.find(dbAccount => dbAccount.userId === account.id)

    if (storedAccount) {
      storedAccount.cash = account.cash;
    } else {
      this.storage.push({ userId: account.id, cash: account.cash })
    }
  }
}