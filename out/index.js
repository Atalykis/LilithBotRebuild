"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_transport_1 = require("./infrastructure/transport/discord/discord.transport");
const account_controller_1 = require("./application/account/account.controller");
// import  CasinoController  from './application/casino/casino.controller'
const account_service_1 = require("./application/account/account.service");
const account_store_in_memory_1 = require("./infrastructure/store/account/account-store.in-memory");
const accountStore = new account_store_in_memory_1.AccountStoreInMemory();
const accountService = new account_service_1.AccountService(accountStore);
const accountController = new account_controller_1.AccountController(accountService);
// const casinoController =  new CasinoController(accountStore)
const token = "ODE1OTE3NDY3MjY4NDE1NTU4.YDzYWw.0hDk7uLdmYLUDeh-USEw_GXlodY";
const transport = new discord_transport_1.DiscordTransport(token);
transport.addController(accountController);
// transport.addController(casinoController)
transport.start();
