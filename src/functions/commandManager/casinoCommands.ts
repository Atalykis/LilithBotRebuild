import * as Discord from "discord.js";

interface AccountMemory {
  username :string
  cash : number
  addCash : (x :number) => void
  removeCash : (x : number) => void
}
  
interface AccountManagerMemory{
  accounts : AccountMemory[]
  addAccount : (account : AccountMemory) => void
  findAccount : (username :string) => AccountMemory | undefined
  createAccount : (account : AccountMemory) => boolean
}

export default class CasinoCommand{

  accountManager : AccountManagerMemory
    
  constructor(accountManager : AccountManagerMemory){
    this.accountManager = accountManager
  }
  doubleOrNothing(message : Discord.Message, value : number){
    const user : AccountMemory | undefined = this.accountManager.findAccount(message.author.id)
    const messageBot = new Discord.MessageEmbed()
                        .setColor('#F7960A')
                        .setTitle('Double OR Nothing')
                        .setThumbnail('https://i.ibb.co/TgzRW2y/IMG-20201124-121326.jpg');
                        //.addField('Inline field title', 'Some value here', true)
    if(user){
        if(user.cash >= value){
          const reply =  new Discord.MessageEmbed()
                        .setColor('#006300')
                        .setTitle('Double or NOTHING')
                        .setTimestamp();
          if(reply){
            messageBot.addField("WIN","Nice one ! You doubled your bet ! and got " + value  + "$. You have " + user.cash +"$", true);
          }else{
            messageBot.addField("LOST","Unlucky... you lost your bet of " + value  + "$. You have " + user.cash +"$", true);
          }
        }else{
          messageBot.addField("ERROR","You don't have enough money BOI. Your current wallet : " + user.cash + "$");
        }
    }else{
      messageBot.addField("SEXE","You don't have any account, Create one with §createAccount")
                          .setColor('#CB0202')
    }
    message.channel.send(messageBot)
  }
}