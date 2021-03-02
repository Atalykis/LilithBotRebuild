import { Message as DiscordMessage } from 'discord.js'

import { Intent } from '../../../shared/intent'


export class DiscordIntent implements Intent {
  constructor(private message: DiscordMessage) {
    if (!message.content.startsWith('$')) {
      throw new Error('not a command')
    }
  }

  private getSegment(i: number) {
    return this.message.content.slice(1).trim().split(' ')[i];
  }

  getCommand() {
    return this.getSegment(0).substr(1)
  }

  getArg(i: number) {
    return this.getSegment(i + 1)
  }
  
  reply(answer: string) {
    return this.message.reply(answer)
  }

  getUserId() {
    return this.message.author.id
  }

}