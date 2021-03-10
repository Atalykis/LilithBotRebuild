"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscordTransport = void 0;
const discord_js_1 = require("discord.js");
const discord_message_in_1 = require("./discord.message-in");
const message_out_1 = require("../../../domain/message-out");
class DiscordTransport {
    // big brother is watching you
    constructor(token) {
        this.token = token;
        this.controllers = [];
        this.client = new discord_js_1.Client();
        this.client.on('message', async (message) => {
            try {
                // we encapsulate the way we communicate with discord here
                const intent = new discord_message_in_1.DiscordMessageIn(message);
                const command = intent.getCommand();
                // we look in every registered controllers
                for (const controller of this.controllers) {
                    // we find the appropriate handler
                    if (controller[command]) {
                        // we try to execute our handler
                        try {
                            return await controller[command](intent);
                        }
                        catch (err) {
                            // if execution of handler throws, we just return from this function
                            console.error('DiscordTransport : ', err);
                            intent.sendInSameChannel(new message_out_1.ErrorMessageOut(err.message));
                            return;
                        }
                        console.log('yolo');
                    }
                }
                // if the loop completes, it means there is no handler for this command      
                intent.reply('command not found');
            }
            catch (error) {
                console.log("not a bot message");
                // not a command do nothing
            }
        });
    }
    addController(controller) {
        this.controllers.push(controller);
    }
    async start() {
        await this.client.login(this.token);
        console.log('Discord bot logged in');
    }
}
exports.DiscordTransport = DiscordTransport;
