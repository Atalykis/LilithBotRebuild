// import { Message } from '../../shared/message'
import { Command } from '../../infrastructure/messager/shared/command'
import { MessageOut } from '../../infrastructure/messager/shared/message-out'
// import { Account } from "../../domain/account";
// import { AccountStore } from '../../infrastructure/store/account/account-store'
import { Bet } from '../../domain/casino/bet';
import { RouletteAmount } from '../../domain/casino/roulette-amount';
import { CasinoService } from "./casino.service";

export default class CasinoController {
  constructor(private casinoService: CasinoService) {}

  // doubleOrNothing(intent : Command) {
  //   const userId : string = intent.getUserId();
  //   const user: Account | undefined = this.accountManager.load(userId);
  //   const messageBot = new CasinoMessageOut("Double OR Nothing",[])
  //   const value : number | string | undefined= parseInt(intent.getArg(0))
  //   console.log("value", value)
  //   if(value === undefined){   
  //     throw new Error("Missing first argument");   
  //   }
  //   if(isNaN(value)){
  //     throw new Error("Your first argument must be a number");
  //   }
  //   //.addField('Inline field title', 'Some value here', true)
  //   if (user) {
  //     if (user.getCash() >= value) {
  //       const reply = new MessageEmbed().setColor("#006300").setTitle("Double or NOTHING").setTimestamp();
  //       if (this.casino.doubleOrNothing(user, value)) {
  //         messageBot.addField("WIN", "Nice one ! You doubled your bet ! and got " + value + "$. You have " + user.cash + "$"});
  //       } else {
  //         messageBot.addField("LOST", "Unlucky... you lost your bet of " + value + "$. You have " + user.cash + "$");
  //       }
  //     } else {
  //       messageBot.addField("ERROR", "You don't have enough money BOI. Your current wallet : " + user.cash + "$");
  //     }
  //   } else {
  //     messageBot.addField("SEXE", "You don't have any account, Create one with §createAccount").setColor("#CB0202");
  //   }
  //   intent.sendInSameChannel(messageBot);
  // }

  // deathRoulette(intent : MessageIn) {
  //   const userId : string = intent.getUserId();
  //   const user: Account | undefined = this.accountManager.load(userId);
    
  //   const answer = new MessageEmbed().setColor("#F7960A").setTitle("Death Roulette").setThumbnail("https://i.ibb.co/TgzRW2y/IMG-20201124-121326.jpg");
  //   const value : number | string | undefined= parseInt(intent.getArg(0))
  //   const roulette : number | string | undefined= parseInt(intent.getArg(1))
  //   console.log("value", value)
  //   console.log("roulette", roulette)
  //   if(value === undefined && value === undefined){   
  //     throw new Error("Missing first argument");   
  //   }
  //   if(isNaN(value) && isNaN(roulette)){
  //     throw new Error("Your first argument must be a number");
  //   }
  //   if (!user) {
  //     throw new Error("You don't have any account, Create one with §createAccount");
  //   }
  //   if (!value) {
  //     throw new Error("You need to add argument, your bet then the roulette size like this §deathRoulette <bet> <roulette>");
  //   }
  //   if (value <= 0 || value !== Math.round(value)) {
  //     throw new Error("The Value of your bet is invalid");
  //   }
  //   if (value > user.cash) {
  //     throw new Error("You don't have enough money for this bet");
  //   }
  //   if (!roulette) {
  //     throw new Error("Missing argument for Roulette");
  //   }
  //   if (roulette <= 1 || roulette !== Math.round(roulette)) {
  //     throw new Error("The value of your roulette is invalid");
  //   }
  //   if (roulette > 100000) {
  //     throw new Error("The Value of the roulette is to high");
  //   }
  //   answer.addFields(
  //     { name: "Death Roulette Time", value: "<@!" + user.id + "> wants to do a deathRoulette" },
  //     { name: "\u200B", value: "Who want to take the challenge ?" },
  //     { name: "BET :", value: value },
  //     { name: "Roulette Size :", value: roulette }
  //   );
  //   intent.sendInSameChannel(answer).then((sentEmbed): any => {
  //     sentEmbed.react("☠️");
  //     const filter = (reaction: MessageReaction, reactingUser: User) => {
  //       return reaction.emoji.name === "☠️" && reactingUser.id != sentEmbed.author.id && user.id != reactingUser.id;
  //     };
  //     const collector: ReactionCollector = sentEmbed.createReactionCollector(filter, { time: 15000 });
  //     collector.on("collect", (reaction, userTwo) => {
  //       const userProfile = this.accountManager.load(userTwo.id);
  //       if (userProfile) {
  //         if (userProfile.cash >= value) {
  //           intent.sendInSameChannel("<@!" + userProfile.id + "> dared to accept the challenge");
  //           this.casino.deathRoulette(userProfile, user, value, roulette, sentEmbed);
  //           collector.stop();
  //         } else {
  //           userTwo.send("You don't have enough money BOI");
  //         }
  //       } else {
  //         userTwo.send("You don't have any account, you can create one with §createAccount");
  //       }
  //     });
  //   });
  // }

  // @Reaction('deathRoulette')
  // async rollDeathRoulette(reaction: DeathRouletteReaction){
  //   this.casinoService.reactOnDeathRoulette(reaction.getDeathRouletteId(), reaction.getUserId())
  // }

  // @Command('deathRoulette')
  async deathRoulette(command: Command){
    const initiatorUserId = command.getUserId()
    const channelId = command.getChannelId()

    const bet = Bet.fromString(command.getArg(0))
    const rouletteAmount = RouletteAmount.fromString(command.getArg(1))
      
    const opponentUserId = await this.casinoService.createDeathRoulette(initiatorUserId, channelId, bet, rouletteAmount)
    return MessageOut.simple(`<!@${opponentUserId}> dared to accept the challenge`)
  }
}