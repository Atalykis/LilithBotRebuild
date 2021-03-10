"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountController = void 0;
const controller_1 = require("../../shared/controller");
class AccountController extends controller_1.Controller {
    constructor(accountService) {
        super();
        this.accountService = accountService;
    }
    caca(intent) {
        try {
            const userId = intent.getUserId();
            this.accountService.createAccount(userId);
        }
        catch (error) {
            throw new Error(`could not create account : ${error.message}`);
        }
    }
    getCash(intent) {
        try {
            const userId = intent.getUserId();
            this.accountService.getCash(userId);
        }
        catch (error) {
            throw new Error(`could not retrieve cash : ${error.message}`);
        }
    }
}
exports.AccountController = AccountController;
