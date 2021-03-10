"use strict";
// import { Account } from '../../domain/account'
// import { MessageEmbed, User, MessageReaction, Message, ReactionCollector } from 'discord.js'
// export default class CasinoService {
//     constructor() {}
//     doubleOrNothing(user: Account, value: number) {
//       if (Math.floor(Math.random() * 100) > 50) {
//         user.addCash(value);
//         return true;
//       }
//       user.removeCash(value);
//       return false;
//     }
//     deathRoulette(user1: Account, user2: Account, value: number, roulette: number, message: Message) {
//       const roll = Math.floor(Math.random() * roulette) + 1;
//       // cas d'arret
//       if (roll === 1) {
//         user2.addCash(value);
//         user1.removeCash(value);
//         const answer = new MessageEmbed()
//           .setColor("#006300")
//           .setTitle("DeathRoulette IS OVER")
//           .setTimestamp()
//           .addFields(
//             { name: "WINNER : ", value: "<@!" + user2.id + ">" },
//             { name: "\u200B", value: "<@!" + user2.id + "> + Won the BET of " + value },
//             { name: "\u200B", value: "Sorry <@!" + user1.id + "> better luck next time" }
//           );
//         message.channel.send(answer);
//         return;
//       }
//       // Game is going
//       const answer = new MessageEmbed()
//         .setColor("#006300")
//         .setTitle("DeathRoulette IS GOING")
//         .setTimestamp()
//         .addFields(
//           { name: "BET", value: value },
//           { name: "Roulette", value: roulette },
//           { name: "\u200B", value: "Click :skull_crossbones: to continue the DeathRoulette" }
//         );
//       message.channel.send(answer).then((sentEmbed :Message): any => {
//         sentEmbed.react("☠️");
//         const filter = (reaction: MessageReaction, user: User) => {
//           return reaction.emoji.name === "☠️" && user.id === user2.id;
//         };
//         const collector: ReactionCollector = sentEmbed.createReactionCollector(filter, { time: 150000 });
//         collector.on("collect", () => {
//           this.deathRoulette(user2, user1, value, roll, sentEmbed);
//         });
//       });
//     }
//   }
