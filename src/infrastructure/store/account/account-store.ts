import { Account } from '../../../domain/account/account'

export interface AccountStore {
  load(userId: string): Account | undefined
  save(account: Account): void
}

