"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountBalanceMessageOut = exports.ErrorMessageOut = exports.AccountCreatedMessageOut = exports.MessageOut = void 0;
class MessageOut {
    constructor(color, title, fields = []) {
        this.color = color;
        this.title = title;
        this.fields = fields;
    }
}
exports.MessageOut = MessageOut;
class AccountCreatedMessageOut extends MessageOut {
    constructor(userId) {
        super('#000000', `Account created for <@!${userId}>`);
    }
}
exports.AccountCreatedMessageOut = AccountCreatedMessageOut;
class ErrorMessageOut extends MessageOut {
    constructor(message) {
        super('#D74E2E', "Warning", [message]);
    }
}
exports.ErrorMessageOut = ErrorMessageOut;
class AccountBalanceMessageOut extends MessageOut {
    constructor(userId, cash) {
        super('#199BCD', "Wallet", [`Bank account for <@!${userId}>`, `You've got ${cash} !`]);
    }
}
exports.AccountBalanceMessageOut = AccountBalanceMessageOut;
// intent.createMessageEmbed("#199BCD", "Account Created",
// [{name : '\u200B', value : "Bank account for <@!" + userId + ">"},{name : '\u200B', value : "You've got " + userCash + " !"}],
// "https://i.ibb.co/TgzRW2y/IMG-20201124-121326.jpg")
// intent.sendInSameChannel(message)
// new Discord.MessageEmbed()
//         .setColor("#F7960A")
//         .setTitle("Help Command")
//         .setAuthor("Lilith", "https://i.ibb.co/TgzRW2y/IMG-20201124-121326.jpg")
//         .setDescription("Hello I'm Lilith and i'm gonna guide you in how to use me to get a fresh new life with your discord server")
//         .setThumbnail("https://i.ibb.co/TgzRW2y/IMG-20201124-121326.jpg")
//         .addFields(
//           { name: "Account Managment", value: "-First of all create your account with §createAccount" },
//           { name: "\u200B", value: "-You can see your cash with §cash" },
//           { name: "Play with my functionnalities", value: "- Try to double your bet with §doubleOrNothing <yourbet>, for exemple §doubleOrNothing 1000" },
//           { name: "Funny", value: "Don't forget to pet me with §pet" }
//         )
//         .setImage("https://i.ibb.co/TgzRW2y/IMG-20201124-121326.jpg")
//         .setTimestamp()
//         .setFooter("Made by Atalykis and ZephDio", "https://i.ibb.co/TgzRW2y/IMG-20201124-121326.jpg")
//     );
