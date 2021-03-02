import * as Discord from "discord.js";
import AccountCommand from "./accountCommands";
import AccountManager from "../account/accountManager"
import CasinoCommand from "./casinoCommands"

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
  
  
interface CasinoMemory{
  doubleOrNothing : (user : AccountMemory, value :  number) => boolean
}

export default class CommandHandler{
  casinoCommand : CasinoCommand
  accountCommand : AccountCommand
  accountManager : AccountManager
  constructor(casino : CasinoMemory){
    this.accountManager = new AccountManager()
    this.casinoCommand = new CasinoCommand(this.accountManager)
    this.accountCommand = new AccountCommand(this.accountManager)
  }

  handleCommand(message : Discord.Message){
    let args  = message.content.slice(1).trim().split(' '); // ["COMMAND", "ARG", "ARG"]
    const command = args.shift();  //["COMMAND"] ["ARG","ARG"]
      switch(command){
        case "message" : message.reply("content");break;
        case "help" : this.help(message);break;
        case "pet" : message.reply("Wouaf Wouaf ! :dog:");break;
        case "createAccount" : this.accountCommand.createAccount(message);break;
        case "cash" : this.accountCommand.cash(message) ;break;
        case "doubleOrNothing" : this.casinoCommand.doubleOrNothing(message, parseInt(args[0]));break;
        default : this.unknown(message);break;
      } 
  }

  
  help(message : Discord.Message){
    message.author.send(new Discord.MessageEmbed()
      .setColor('#F7960A')
      .setTitle('Help Command')
      .setAuthor('Lilith', 'https://i.ibb.co/TgzRW2y/IMG-20201124-121326.jpg')
      .setDescription("Hello I'm Lilith and i'm gonna guide you in how to use me to get a fresh new life with your discord server")
      .setThumbnail('https://i.ibb.co/TgzRW2y/IMG-20201124-121326.jpg')
      .addFields(
        { name: 'Account Managment', value: '-First of all create your account with §createAccount' },
        { name: '\u200B', value: '-You can see your cash with §cash' },
        { name: 'Play with my functionnalities', value: '- Try to double your bet with §doubleOrNothing <yourbet>, for exemple §doubleOrNothing 1000' },
        { name: 'Funny', value: "Don't forget to pet me with §pet" },
      )
      .setImage('https://i.ibb.co/TgzRW2y/IMG-20201124-121326.jpg')
      .setTimestamp()
      .setFooter('Made by Atalykis and ZephDio', 'https://i.ibb.co/TgzRW2y/IMG-20201124-121326.jpg'))
  }

  unknown(message : Discord.Message){
    message.reply("Unknown command..Discord. use §help for more information ♥")
  }
  
}