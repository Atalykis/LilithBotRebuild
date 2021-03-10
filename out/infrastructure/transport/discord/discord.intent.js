"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscordIntent = void 0;
const discord_js_1 = require("discord.js");
class DiscordIntent {
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
    reply(answer) {
        return this.message.reply(answer);
    }
    getUserId() {
        return this.message.author.id;
    }
    sendInSameChannel(answer) {
        return this.message.channel.send(answer);
    }
    createMessageEmbed(color, title, fields, thumbnail, image, description, author, footer) {
        const message = new discord_js_1.MessageEmbed()
            .setColor(color)
            .setTitle(title)
            .setTimestamp()
            .addFields(...fields);
        if (thumbnail) {
            message.setThumbnail(thumbnail);
        }
        if (image) {
            message.setImage(image);
        }
        if (description) {
            message.setDescription(description);
        }
        if (author) {
            message.setAuthor(author);
        }
        if (footer) {
            message.setFooter(footer);
        }
        return message;
    }
}
exports.DiscordIntent = DiscordIntent;
