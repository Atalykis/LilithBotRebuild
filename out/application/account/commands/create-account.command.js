"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAccountHandler = exports.CreateAccountCommand = void 0;
const account_1 = require("../../../domain/account");
class CreateAccountCommand {
    constructor(userId) {
        this.userId = userId;
    }
} // Il veut creer un account pour l'id 4
exports.CreateAccountCommand = CreateAccountCommand;
class CreateAccountHandler {
    constructor(accountStore) {
        this.accountStore = accountStore;
    }
    execute({ userId }) {
        const existingAccount = this.accountStore.load(userId);
        if (existingAccount) {
            throw new Error(`account for ${userId} already exist`);
        }
        const account = new account_1.Account(userId);
        this.accountStore.save(account);
    }
}
exports.CreateAccountHandler = CreateAccountHandler;
