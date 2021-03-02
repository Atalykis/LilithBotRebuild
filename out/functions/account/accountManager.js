"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AccountManager {
    constructor() {
        this.accounts = [];
    }
    addAccount(account) {
        this.accounts.push(account);
    }
    findAccount(username) {
        return this.accounts.find(element => element.username === username);
    }
    createAccount(account) {
        if (this.findAccount(account.username)) {
            return false;
        }
        else {
            this.addAccount(account);
            return true;
        }
    }
}
exports.default = AccountManager;
