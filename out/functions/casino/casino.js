"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Casino {
    constructor() {
    }
    doubleOrNothing(user, value) {
        if (Math.floor(Math.random() * 100) > 50) {
            user.addCash(value);
            return true;
        }
        user.removeCash(value);
        return false;
    }
}
exports.default = Casino;
