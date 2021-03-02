"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
}
exports.default = Account;
