import { Account } from '../../../domain/account'

export interface AccountStore {
  load(userId: string): Account | undefined
  save(account: Account): void
}

