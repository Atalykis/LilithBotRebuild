"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCashHandler = exports.GetCashQuery = void 0;
class GetCashQuery {
    constructor(userId) {
        this.userId = userId;
    }
}
exports.GetCashQuery = GetCashQuery;
class GetCashHandler {
    constructor(accountStore) {
        this.accountStore = accountStore;
    }
    execute({ userId }) {
        const account = this.accountStore.load(userId);
        if (!account) {
            throw new Error(`no account found for ${userId}`);
        }
        return account.cash;
    }
}
exports.GetCashHandler = GetCashHandler;
