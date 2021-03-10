import { MessageOut } from "../../infrastructure/messager/shared/message-out"

export class AccountCreatedMessageOut extends MessageOut {
  constructor(userId: string) {
    super('#000000', `Account created for <@!${userId}>`)
  }
}

export class AccountBalanceMessageOut extends MessageOut {
  constructor(userId: string, cash: number){
    super('#199BCD', "Wallet" , [`Bank account for <@!${userId}>`, `You've got ${cash} !`])
  }
}