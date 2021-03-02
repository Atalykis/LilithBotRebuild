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
const casino_1 = __importDefault(require("../casino/casino"));
class CasinoCommand {
    constructor(accountManager) {
        this.accountManager = accountManager;
        this.casino = new casino_1.default();
    }
    doubleOrNothing(message, value) {
        const user = this.accountManager.findAccount(message.author.id);
        const messageBot = new Discord.MessageEmbed()
            .setColor('#F7960A')
            .setTitle('Double OR Nothing')
            .setThumbnail('https://i.ibb.co/TgzRW2y/IMG-20201124-121326.jpg');
        //.addField('Inline field title', 'Some value here', true)
        if (user) {
            if (user.cash >= value) {
                const reply = new Discord.MessageEmbed()
                    .setColor('#006300')
                    .setTitle('Double or NOTHING')
                    .setTimestamp();
                if (this.casino.doubleOrNothing(user, value)) {
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
    deathRoulette(message, value, roulette) {
        const user = this.accountManager.findAccount(message.author.id);
        const answer = new Discord.MessageEmbed()
            .setColor('#F7960A')
            .setTitle('Death Roulette')
            .setThumbnail('https://i.ibb.co/TgzRW2y/IMG-20201124-121326.jpg');
        if (user) {
            answer.addFields({ name: 'Death Roulette Time', value: "<@!" + user.id + "> wants to do a deathRoulette" }, { name: '\u200B', value: 'Who want to take the challenge ?' }, { name: 'BET :', value: value }, { name: 'Roulette Size :', value: roulette });
            message.channel.send(answer).then((sentEmbed) => {
                sentEmbed.react("☠️");
                const filter = (reaction, user) => {
                    return reaction.emoji.name === '☠️' && (user.id != sentEmbed.author.id);
                };
                const collector = sentEmbed.createReactionCollector(filter, { time: 15000 });
                collector.on('collect', (reaction, userTwo) => {
                    const userProfile = this.accountManager.findAccount(userTwo.id);
                    if (userProfile) {
                        if (userProfile.cash >= value) {
                            message.channel.send("<@!" + userProfile.id + "> dared to accept the challenge");
                            this.casino.deathRoulette(userProfile, user, value, roulette, sentEmbed);
                            collector.stop();
                        }
                        else {
                            userTwo.send("You don't have enough money BOI");
                            reaction.remove();
                        }
                    }
                    else {
                        userTwo.send("You don't have any account, you can create one with §createAccount");
                        reaction.remove();
                    }
                });
            });
        }
        else {
            answer.addField("Error", "You don't have any account, Create one with §createAccount");
            message.channel.send(answer);
        }
    }
}
exports.default = CasinoCommand;
// let hasBeenAnswered = false;
// let loopForDR = () => {
//   sentEmbed.awaitReactions(filter, {max:2, time:60000,  errors: ['time']})
//   const reaction : any = collected.first()
//   if(reaction.count === 2){
//     const userId = reaction.users.cache.find((user : Discord.User) => !user.bot).id
//     if(this.accountManager.findAccount(userId))
//     message.channel.send("<@!"+ userId + "> dared to accept the challenge")
//   }
// }
// sentEmbed.awaitReactions(filter, {max:5, time:60000,  errors: ['time']})
// .then(collected => {
//   const reaction : any = collected.first()
//   if(reaction.count === 2){
//     const userId = reaction.users.cache.find((user : Discord.User) => !user.bot).id
//     
//   }
// })
