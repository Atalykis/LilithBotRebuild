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
const casino_1 = __importDefault(require("./functions/casino/casino"));
const commandHandler_1 = __importDefault(require("./functions/commandManager/commandHandler"));
const bot = new Discord.Client();
const token = "ODE1OTE3NDY3MjY4NDE1NTU4.YDzYWw.Asc2-nWUCSPhpdfa9FgBJrK3anE";
const casino = new casino_1.default();
const commandHandler = new commandHandler_1.default(casino);
bot.on('ready', function () {
    console.log("Je suis connecté !");
});
bot.login(token);
bot.on('message', message => {
    //console.log(message)
    if (!message.content.startsWith("§"))
        return;
    commandHandler.handleCommand(message);
});
// const exampleEmbed = new Discord.MessageEmbed()
//   .setColor('#F7960A')
//   .setTitle('Double OR Nothing')
//   .setURL('https://discord.js.org/')
//   .setAuthor('Some name', 'https://imgur.com/a/BrcPLWu', 'https://discord.js.org')
//   .setDescription('Some description here')
//   .setThumbnail('https://imgur.com/a/BrcPLWu')
//   .addFields(
//     { name: 'Regular field title', value: 'Some value here' },
//     { name: '\u200B', value: '\u200B' },
//     { name: 'Inline field title', value: 'Some value here', inline: true },
//     { name: 'Inline field title', value: 'Some value here', inline: true },
//   )
//   .addField('Inline field title', 'Some value here', true)
//   .setImage('https://imgur.com/a/BrcPLWu')
//   .setTimestamp()
//   .setFooter('Some footer text here', 'https://imgur.com/a/BrcPLWu');
