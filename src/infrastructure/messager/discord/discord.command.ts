import { Message as DiscordClientMessage} from 'discord.js'

import { Command } from '../shared/command'
import { DiscordMessageIn } from "./discord.message-in"

export class DiscordCommand extends DiscordMessageIn implements Command {
  
  static isCommand(message: DiscordClientMessage){
    return message.content.startsWith('$')
  }
  
  constructor(public message :DiscordClientMessage){
    super(message)
    if (!DiscordCommand.isCommand(message)) {
      throw new Error('not a command')
    }
  }

  private getSegment(i: number) {
    return this.message.content.slice(1).trim().split(' ')[i]; 
  }

  getCommand() {
    return this.getSegment(0)
  }

  getArg(i: number) :string{
    return this.getSegment(i + 1)
  }

}
