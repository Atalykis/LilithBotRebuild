import Account from "../account/account";
import AccountManager from "../account/accountManager"
import * as Discord from "discord.js";

export default class AccountCommand{

  accountManager : AccountManager
  
  constructor(accountManager : AccountManager){
      this.accountManager = accountManager
  }

  createAccount(message :Discord.Message){
      const user = this.accountManager.createAccount(new Account(message.author.id, 100000))
      const answer = new Discord.MessageEmbed()
                          .setColor('#F7960A')
                          .setTitle('Account creation')
                          .setThumbnail('https://i.ibb.co/TgzRW2y/IMG-20201124-121326.jpg')
                          .setTimestamp();
      if(user){
        answer.addField('Succesfull', 'Account succesfully created', true)
        }else{
        answer.addField("Error", "Account already exist", true)
        }
        message.channel.send(answer)
    }
    
      
  cash(message : Discord.Message){
    const user = this.accountManager.findAccount(message.author.id);
    const answer = new Discord.MessageEmbed()
                        .setColor('#006300')
                        .setTitle('Wallet')
                        .setThumbnail('https://i.ibb.co/TgzRW2y/IMG-20201124-121326.jpg')
                        .setTimestamp();
    if(user){
      answer.addField("\u200B" ,"<@!" + user.username + ">" + " You have " + user.cash +"$", true)
    }else{
      answer.addField("Error" ,"You don't have any account :c ; try creating one with §createAccount", true)
            .setColor('#CB0202')
    }
    message.channel.send(answer)
  }



}