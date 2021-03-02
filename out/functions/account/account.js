"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Account {
    constructor(username, cash = 0) {
        this.username = username;
        this.cash = cash;
    }
    addCash(x) {
        this.cash += x;
    }
    removeCash(x) {
        this.cash -= x;
    }
}
exports.default = Account;
