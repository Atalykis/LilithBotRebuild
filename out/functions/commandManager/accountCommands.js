"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const account_1 = __importDefault(require("../account/account"));
const Discord = __importStar(require("discord.js"));
class AccountCommand {
    constructor(accountManager) {
        this.accountManager = accountManager;
    }
    createAccount(message) {
        const user = this.accountManager.createAccount(new account_1.default(message.author.id, 100000));
        const answer = new Discord.MessageEmbed()
            .setColor('#F7960A')
            .setTitle('Account creation')
            .setThumbnail('https://i.ibb.co/TgzRW2y/IMG-20201124-121326.jpg')
            .setTimestamp();
        if (user) {
            answer.addField('Succesfull', 'Account succesfully created', true);
        }
        else {
            answer.addField("Error", "Account already exist", true);
        }
        message.channel.send(answer);
    }
    cash(message) {
        const user = this.accountManager.findAccount(message.author.id);
        const answer = new Discord.MessageEmbed()
            .setColor('#006300')
            .setTitle('Wallet')
            .setThumbnail('https://i.ibb.co/TgzRW2y/IMG-20201124-121326.jpg')
            .setTimestamp();
        if (user) {
            answer.addField("\u200B", "<@!" + user.username + ">" + " You have " + user.cash + "$", true);
        }
        else {
            answer.addField("Error", "You don't have any account :c ; try creating one with §createAccount", true)
                .setColor('#CB0202');
        }
        message.channel.send(answer);
    }
}
exports.default = AccountCommand;
