"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscordIntent = void 0;
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
        return this.getSegment(0).substr(1);
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
}
exports.DiscordIntent = DiscordIntent;
