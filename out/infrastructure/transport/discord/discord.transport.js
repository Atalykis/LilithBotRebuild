"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscordTransport = void 0;
const discord_js_1 = require("discord.js");
const discord_intent_1 = require("./discord.intent");
class DiscordTransport {
    constructor(token) {
        this.token = token;
        this.controllers = [];
        this.client = new discord_js_1.Client();
        this.client.on('message', (message) => {
            try {
                // we encapsulate the way we communicate with discord here
                const intent = new discord_intent_1.DiscordIntent(message);
                const command = intent.getCommand();
                // we look in every registered controllers
                for (const controller of this.controllers) {
                    // we find the appropriate handler
                    if (controller[command]) {
                        // we try to execute our handler
                        try {
                            return controller[command](intent);
                        }
                        catch (error) {
                            // if execution of handler throws, we just return from this function
                            console.error('DiscordTransport : ', error);
                            intent.reply(error.message);
                            return;
                        }
                    }
                }
                // if the loop completes, it means there is no handler for this command      
                intent.reply('command not found');
            }
            catch (error) {
                return;
                // not a command do nothing
            }
        });
    }
    addController(controller) {
        this.controllers.push(controller);
    }
    async start() {
        await this.client.login(this.token);
    }
}
exports.DiscordTransport = DiscordTransport;
