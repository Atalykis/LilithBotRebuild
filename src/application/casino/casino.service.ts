import { AccountStore } from '../../infrastructure/store/account/account-store'
import { Bet } from '../../domain/casino/bet'
import { RouletteAmount } from '../../domain/casino/roulette-amount'
import { PositiveInteger } from '../../domain/casino/positive-integer'
import { MessageOut } from '../../infrastructure/messager/shared/message-out'

class Roulette {
  constructor(private amount: PositiveInteger){}

  private getNextAmount(){
    const roll = Math.random() * this.amount.getNumber() + 1
    return PositiveInteger.fromNumber(Math.floor(roll))
  }

  isFinished(): boolean {
    if(this.amount.getNumber() === 1){
      return true      
    }
    return false
  }

  getCurrentValue(){
    return this.amount.getNumber()
  }

  roll() {
    this.amount = this.getNextAmount()
  }

}


export class CasinoService {
  constructor(private readonly accountStore: AccountStore, private readonly messager : Messager) {}

  async createDeathRoulette(initiatorId: string, channelId: string, bet: Bet, amount: RouletteAmount){
    const initiator = this.accountStore.load(initiatorId)
    
    if(!initiator){
      throw new Error(`User ${initiatorId} has no account`)
    }

    if(initiator.getCash() < bet.getNumber()){
      throw new Error(`User ${initiatorId} does not have enough money`)
    }

    const message = await this.messager.sendOnChannel(channelId, MessageOut.simple(`DeathRoulette ${initiatorId}`))

      
    const opponent = await this.messager.waitUserReaction(message, async (emoji: string, pretendentId: string) => {     
      if (emoji !== '☠️') {
        throw new Error(`User ${pretendentId} reacted with unhandled emoji`)
      }

      if(pretendentId === initiatorId){
        throw new Error(`User ${pretendentId} cannot be its own opponent`)
      }
      
      const pretendent = this.accountStore.load(pretendentId)
      if (!pretendent) {
        await this.messager.sendDm(pretendentId, MessageOut.simple('You dont have enough money'))
        throw new Error(`User ${pretendentId} does not have a registered account`)
      }
      
      if(pretendent.getCash() < bet.getNumber()){
        await this.messager.sendDm(pretendentId, MessageOut.simple('You dont have enough money'))
        throw new Error(`User ${pretendentId} does not have enough money`)
      }
      return pretendent
    }).catch(error => {
      throw new Error('Could not get an opponent')
    })

    console.log(opponent)

    initiator.removeCash(bet.getNumber())
    opponent.removeCash(bet.getNumber())
    
    const roulette = new Roulette(amount)
    let currentUser = initiator
    // while(!roulette.isFinished()){
    //   const gameMessage = await this.messager.sendOnChannel(channelId, MessageOut.simple(`Roulette at ${this.messager.tagUser(currentUser.id)} ${roulette.getCurrentValue()}`))
    //   // await this.messager.waitUserReaction(gameMessage, (emoji, userId, complete) => {
    //   //   if(userId == opponent.id){
    //   //     if(emoji == '☠️'){
    //   //       complete()
    //   //     }
    //   //   }
    //   //   return undefined
    //   // })
      
    //   roulette.roll()
    // }

    currentUser.addCash(bet.getNumber()*2)
    this.messager.sendOnChannel(channelId, MessageOut.simple(`GG ${this.messager.tagUser(currentUser.id)}`))

    // roulette

  }

  //   doubleOrNothing(user: Account, value: number) {
  //     if (Math.floor(Math.random() * 100) > 50) {
  //       user.addCash(value);
  //       return true;
  //     }
  //     user.removeCash(value);
  //     return false;
  //   }
  
  //   deathRoulette(user1: Account, user2: Account, value: number, roulette: number, message: Message) {
  //     const roll = Math.floor(Math.random() * roulette) + 1;
  //     // cas d'arret
  //     if (roll === 1) {
  //       user2.addCash(value);
  //       user1.removeCash(value);
  //       const answer = new MessageEmbed()
  //         .setColor("#006300")
  //         .setTitle("DeathRoulette IS OVER")
  //         .setTimestamp()
  //         .addFields(
  //           { name: "WINNER : ", value: "<@!" + user2.id + ">" },
  //           { name: "\u200B", value: "<@!" + user2.id + "> + Won the BET of " + value },
  //           { name: "\u200B", value: "Sorry <@!" + user1.id + "> better luck next time" }
  //         );
  
  //       message.channel.send(answer);
  //       return;
  //     }
  
  //     // Game is going
  //     const answer = new MessageEmbed()
  //       .setColor("#006300")
  //       .setTitle("DeathRoulette IS GOING")
  //       .setTimestamp()
  //       .addFields(
  //         { name: "BET", value: value },
  //         { name: "Roulette", value: roulette },
  //         { name: "\u200B", value: "Click :skull_crossbones: to continue the DeathRoulette" }
  //       );
  //     message.channel.send(answer).then((sentEmbed :Message): any => {
  //       sentEmbed.react("☠️");
  //       const filter = (reaction: MessageReaction, user: User) => {
  //         return reaction.emoji.name === "☠️" && user.id === user2.id;
  //       };
  //       const collector: ReactionCollector = sentEmbed.createReactionCollector(filter, { time: 150000 });
  //       collector.on("collect", () => {
  //         this.deathRoulette(user2, user1, value, roll, sentEmbed);
  //       });
  //     });
  //   }
  // }
}