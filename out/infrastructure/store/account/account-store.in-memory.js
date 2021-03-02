"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountStoreInMemory = void 0;
const account_1 = require("../../../domain/account");
class AccountStoreInMemory {
    constructor() {
        this.storage = [];
    }
    load(userId) {
        const account = this.storage.find(dbAccount => dbAccount.userId === userId);
        if (!account) {
            return;
        }
        return new account_1.Account(account.userId, account.cash);
    }
    save(account) {
        const storedAccount = this.storage.find(dbAccount => dbAccount.userId === account.id);
        if (storedAccount) {
            storedAccount.cash = account.cash;
        }
        else {
            this.storage.push({ userId: account.id, cash: account.cash });
        }
    }
}
exports.AccountStoreInMemory = AccountStoreInMemory;
