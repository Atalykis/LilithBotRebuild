"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountService = void 0;
const account_1 = require("../../domain/account");
class AccountService {
    constructor(accountStore) {
        this.accountStore = accountStore;
    }
    createAccount(userId) {
        const existingAccount = this.accountStore.load(userId);
        if (existingAccount) {
            throw new Error(`account for ${userId} already exist`);
        }
        const account = new account_1.Account(userId, 10);
        this.accountStore.save(account);
    }
    getCash(userId) {
        const account = this.accountStore.load(userId);
        if (!account) {
            throw new Error(`no account found for ${userId}`);
        }
        return account.cash;
    }
}
exports.AccountService = AccountService;
