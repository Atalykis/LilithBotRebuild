import { Client as DiscordClient } from 'discord.js'

import { AccountController } from './application/account/account.controller'
import { AccountService } from './application/account/account.service'
import CasinoController from './application/casino/casino.controller'
import { CasinoService } from './application/casino/casino.service'
import { DiscordMessager } from './infrastructure/messager/discord/discord.messager'
import { DiscordTransport } from './infrastructure/messager/discord/discord.transport'
import { AccountStoreInMemory } from './infrastructure/store/account/account-store.in-memory'


const token = "ODE1OTE3NDY3MjY4NDE1NTU4.YDzYWw.0hDk7uLdmYLUDeh-USEw_GXlodY"
const client = new DiscordClient()


const accountStore = new AccountStoreInMemory()
const accountService = new AccountService(accountStore)
const accountController = new AccountController(accountService)
const messager = new DiscordMessager(client)
const transport = new DiscordTransport(client, messager, token)
const casinoService = new CasinoService(accountStore, messager)
const casinoController =  new CasinoController(casinoService)


transport.addController(accountController)
transport.addController(casinoController)
transport.start()

// function instanceOf(instance, Class){
//   return instance.__proto__ === Class.prototype
// }

// function parse(...args: any[]){
//   if(instanceOf(new Boolean(true),Boolean)){
//     return false
//   }
//   console.log('=================')
//   console.log(0, args[0])
//   console.log('=================')
//   console.log(1, args[1])
//   console.log('=================')
//   console.log(2, args[2])
// }

// const prenom = 'niriles'

// parse`coucou ${prenom} comment ca va ${prenom}`