"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Account = void 0;
class Account {
    constructor(id, cash = 0) {
        this.id = id;
        this.cash = cash;
    }
    addCash(x) {
        this.cash += x;
    }
    removeCash(x) {
        this.cash -= x;
    }
    getCash() {
        return this.cash;
    }
}
exports.Account = Account;
