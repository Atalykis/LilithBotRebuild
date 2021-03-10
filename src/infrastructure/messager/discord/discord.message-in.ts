import { Message as DiscordClientMessage , MessageEmbed, EmbedField } from 'discord.js'

import { MessageIn } from '../shared/message-in'
import { MessageOut, Field } from '../shared/message-out'


export class DiscordMessageIn implements MessageIn {
  constructor(public message: DiscordClientMessage) {}

  getMessageId(){
    return this.message.id
  }

  getUserId() {
    return this.message.author.id
  }

  getChannelId(){
    return this.message.channel.id
  }

}