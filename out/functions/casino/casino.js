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
    deathRoulette(user1, user2, value, roulette, message) {
        const roll = Math.floor(Math.random() * roulette) + 1;
        // cas d'arret
        if (roll === 1) {
            const answer = new Discord.MessageEmbed()
                .setColor('#006300')
                .setTitle('DeathRoulette IS OVER')
                .setTimestamp()
                .addFields({ name: "WINNER : ", value: "<@!" + user2.id + ">" }, { name: "\u200B", value: "<@!" + user2.id + "> + Won the BET of " + value }, { name: "\u200B", value: "Sorry <@!" + user1.id + "> better luck next time" });
            user2.addCash(value);
            message.channel.send(answer);
            return;
        }
        // Game is going
        const answer = new Discord.MessageEmbed()
            .setColor('#006300')
            .setTitle('DeathRoulette IS GOING')
            .setTimestamp()
            .addFields({ name: "BET", value: value }, { name: "Roulette", value: roulette }, { name: "\u200B", value: "Click :skull_crossbones: to continue the DeathRoulette" });
        message.channel.send(answer).then((sentEmbed) => {
            sentEmbed.react("☠️");
            const filter = (reaction, user) => {
                return reaction.emoji.name === '☠️' && (user.id === user2.id);
            };
            const collector = sentEmbed.createReactionCollector(filter, { time: 150000 });
            collector.on('collect', () => {
                this.deathRoulette(user2, user1, value, roll, sentEmbed);
            });
        });
    }
}
exports.default = Casino;
