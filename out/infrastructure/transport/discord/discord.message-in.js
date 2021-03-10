"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscordMessageIn = void 0;
const discord_js_1 = require("discord.js");
class DiscordMessageIn {
    constructor(message) {
        this.message = message;
        if (!message.content.startsWith('$')) {
            throw new Error('not a command');
        }
    }
    getSegment(i) {
        return this.message.content.slice(1).trim().split(' ')[i];
    }
    getCommand() {
        return this.getSegment(0);
    }
    getArg(i) {
        return this.getSegment(i + 1);
    }
    async reply(message) {
        await this.message.reply(message);
    }
    getUserId() {
        return this.message.author.id;
    }
    async sendInSameChannel(message) {
        const discordMessage = this.messageOutToDiscordResponse(message);
        await this.message.channel.send(discordMessage); // MESSAGE DICORD SUR LA CONV
    }
    messageOutToDiscordResponse(messageOut) {
        return new discord_js_1.MessageEmbed({
            color: messageOut.color,
            title: messageOut.title,
            fields: messageOut.fields.map(this.messageFieldToDiscordField)
        });
    }
    messageFieldToDiscordField(field) {
        if (typeof field === 'string') {
            return { name: '\u200B', value: field, inline: false };
        }
        return { name: field.name, value: field.value, inline: field.inline || false };
    }
}
exports.DiscordMessageIn = DiscordMessageIn;
