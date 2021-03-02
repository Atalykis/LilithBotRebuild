import { DiscordTransport } from './infrastructure/transport/discord/discord.transport'
import { AccountController } from './application/account/account.controller'
import { AccountService } from './application/account/account.service'
import { AccountStoreInMemory } from './infrastructure/store/account/account-store.in-memory'


const accountStore = new AccountStoreInMemory()
const accountService = new AccountService(accountStore)
const accountController = new AccountController(accountService)


const token = ""
const transport = new DiscordTransport(token)
transport.addController(accountController)
transport.start()