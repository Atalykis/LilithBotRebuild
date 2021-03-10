"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountController = void 0;
const controller_1 = require("../../shared/controller");
// import { MessageEmbed, User, Message } from 'discord.js'
const message_out_1 = require("../../domain/message-out");
class AccountController extends controller_1.Controller {
    constructor(accountService) {
        super();
        this.accountService = accountService;
    }
    createAccount(intent) {
        try {
            const userId = intent.getUserId();
            console.log('creating account for ', userId);
            this.accountService.createAccount(userId);
            const message = new message_out_1.AccountCreatedMessageOut('Account Created');
            intent.sendInSameChannel(message);
        }
        catch (error) {
            throw new Error(`could not create account : ${error.message}`);
        }
    }
    cash(intent) {
        try {
            const userId = intent.getUserId();
            const cash = this.accountService.getCash(userId);
            const message = new message_out_1.AccountBalanceMessageOut(userId, cash);
            intent.sendInSameChannel(message);
        }
        catch (error) {
            throw new Error(`could not retrieve cash : ${error.message}`);
        }
    }
}
exports.AccountController = AccountController;
