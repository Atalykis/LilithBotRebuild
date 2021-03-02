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
const Discord = __importStar(require("discord.js"));
const accountCommands_1 = __importDefault(require("./accountCommands"));
const accountManager_1 = __importDefault(require("../account/accountManager"));
const casinoCommands_1 = __importDefault(require("./casinoCommands"));
class CommandHandler {
    constructor() {
        this.accountManager = new accountManager_1.default();
        this.casinoCommand = new casinoCommands_1.default(this.accountManager);
        this.accountCommand = new accountCommands_1.default(this.accountManager);
    }
    handleCommand(message) {
        let args = message.content.slice(1).trim().split(' '); // ["COMMAND", "ARG", "ARG"]
        const command = args.shift(); //["COMMAND"] ["ARG","ARG"]
        switch (command) {
            case "message":
                message.reply("content");
                break;
            case "help":
                this.help(message);
                break;
            case "pet":
                message.reply("Wouaf Wouaf ! :dog:");
                break;
            case "createAccount":
            case "createaccount":
                this.accountCommand.createAccount(message);
                break;
            case "cash":
                this.accountCommand.cash(message);
                break;
            case "doubleOrNothing":
                this.casinoCommand.doubleOrNothing(message, parseInt(args[0]));
                break;
            case "deathRoulette":
                this.casinoCommand.deathRoulette(message, parseInt(args[0]), parseInt(args[1]));
                break;
            default:
                this.unknown(message);
                break;
        }
    }
    help(message) {
        message.author.send(new Discord.MessageEmbed()
            .setColor('#F7960A')
            .setTitle('Help Command')
            .setAuthor('Lilith', 'https://i.ibb.co/TgzRW2y/IMG-20201124-121326.jpg')
            .setDescription("Hello I'm Lilith and i'm gonna guide you in how to use me to get a fresh new life with your discord server")
            .setThumbnail('https://i.ibb.co/TgzRW2y/IMG-20201124-121326.jpg')
            .addFields({ name: 'Account Managment', value: '-First of all create your account with §createAccount' }, { name: '\u200B', value: '-You can see your cash with §cash' }, { name: 'Play with my functionnalities', value: '- Try to double your bet with §doubleOrNothing <yourbet>, for exemple §doubleOrNothing 1000' }, { name: 'Funny', value: "Don't forget to pet me with §pet" })
            .setImage('https://i.ibb.co/TgzRW2y/IMG-20201124-121326.jpg')
            .setTimestamp()
            .setFooter('Made by Atalykis and ZephDio', 'https://i.ibb.co/TgzRW2y/IMG-20201124-121326.jpg'));
    }
    unknown(message) {
        message.reply("Unknown command..Discord. use §help for more information ♥");
    }
}
exports.default = CommandHandler;
