import { Intent } from '../../shared/intent'
import { AccountService } from './account.service'
import { Controller } from '../../shared/controller'


export class AccountController extends Controller {

  constructor(private readonly accountService: AccountService) {
    super();
  }

  
  createAccount(intent: Intent) {
    try {
      const userId = intent.getUserId()

      this.accountService.createAccount(userId)
    } catch (error) {
      throw new Error(`could not create account : ${error.message}`)
    }
  }

  getCash(intent: Intent) {
    try {
      const userId = intent.getUserId()

      this.accountService.getCash(userId)
    } catch (error) {
      throw new Error(`could not retrieve cash : ${error.message}`)
    }
  }
}