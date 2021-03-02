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
Object.defineProperty(exports, "__esModule", { value: true });
const Discord = __importStar(require("discord.js"));
class CommandManager {
    constructor() { }
    doubleOrNothing(message, value) {
        const user = accountManager.findAccount(message.author.id);
        const messageBot = new Discord.MessageEmbed()
            .setColor('#F7960A')
            .setTitle('Double OR Nothing')
            .setThumbnail('https://i.ibb.co/TgzRW2y/IMG-20201124-121326.jpg');
        //.addField('Inline field title', 'Some value here', true)
        if (user) {
            if (user.cash >= value) {
                const reply = casino.doubleOrNothing(user, value);
                if (reply) {
                    messageBot.addField("WIN", "Nice one ! You doubled your bet ! and got " + value + "$. You have " + user.cash + "$", true);
                }
                else {
                    messageBot.addField("LOST", "Unlucky... you lost your bet of " + value + "$. You have " + user.cash + "$", true);
                }
            }
            else {
                messageBot.addField("ERROR", "You don't have enough money BOI. Your current wallet : " + user.cash + "$");
            }
        }
        else {
            messageBot.addField("SEXE", "You don't have any account, Create one with §createAccount")
                .setColor('#CB0202');
        }
        message.channel.send(messageBot);
    }
    createAccount(message) {
        const user = accountManager.createAccount(new Account(message.author.id, 100000));
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
        const user = accountManager.findAccount(message.author.id);
        const answer = new Discord.MessageEmbed()
            .setColor('#006300')
            .setTitle('Wallet')
            .setThumbnail('https://i.ibb.co/TgzRW2y/IMG-20201124-121326.jpg')
            .setTimestamp();
        if (user) {
            answer.addField(" ", "<@!" + user.username + ">" + " You have " + user.cash + "$", true);
        }
        else {
            answer.addField("Error", "You don't have any account :c ; try creating one with §createAccount", true)
                .setColor('#CB0202');
        }
        message.channel.send(answer);
    }
    unknown(message) {
        message.reply("Sorry this commande is unknown... try §help for more information ♥");
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
}
exports.default = CommandManager;
