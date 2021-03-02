"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AccountManager {
    constructor() {
        this.accounts = [];
    }
    addAccount(account) {
        this.accounts.push(account);
    }
    findAccount(userid) {
        return this.accounts.find(element => element.id === userid);
    }
    createAccount(account) {
        if (this.findAccount(account.id)) {
            return false;
        }
        else {
            this.addAccount(account);
            return true;
        }
    }
}
exports.default = AccountManager;
