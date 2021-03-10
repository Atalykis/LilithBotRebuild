import { Client, EmbedField, MessageEmbed } from 'discord.js'

import { Field, MessageOut } from '../shared/message-out'
import { MessageIn } from '../shared/message-in'
import { Messager, UserReactionFilter } from '../shared/messager'
import { DiscordMessageIn } from './discord.message-in'

export class DiscordMessager implements Messager {
  constructor(private readonly client: Client){}

  async sendOnChannel(channelId: string, message: MessageOut) {
    const channel = await this.client.channels.fetch(channelId)
    if(channel.isText()){
      const messageSended = await channel.send({ embed: this.messageOutToDiscordResponse(message), split: false })
      return new DiscordMessageIn(messageSended)
    }else{
      throw new Error('Cannot send messages on non text channels')
    }
  }

  async sendDm(userId: string, message: MessageOut) {
    const user = await this.client.users.fetch(userId)
    const dmChannel = await user.createDM()
    const sentMessage = await dmChannel.send({ embed: this.messageOutToDiscordResponse(message), split: false })
    return new DiscordMessageIn(sentMessage)
  }

  async waitUserReaction<T>(message: MessageIn, filter: UserReactionFilter<T>): Promise<T> {
    const channel = await this.client.channels.fetch(message.getChannelId())
    if(!channel.isText()){
      throw new Error('Cannot wait for user reaction in a vocal channel')
    }

    const discordMessage = await channel.messages.fetch(message.getMessageId())

    const collector = discordMessage.createReactionCollector(() => true, {time : 15000})
  
    const account = await new Promise<T>(async (resolve, reject) => {
      
      collector.on('end', () => {
        reject('User reaction timeout')
      })

      collector.on('collect', async (reaction, user) => {
        try {
          const account = await filter(reaction.emoji.name, user.id)
          resolve(account)
        } catch(error){
          return;
        }
      })
    })
      
    collector.stop()
    return account
  }

  private messageOutToDiscordResponse(messageOut: MessageOut): MessageEmbed {
    return new MessageEmbed({
      color: messageOut.color,
      title: messageOut.title,
      fields: messageOut.fields.map(this.messageFieldToDiscordField)
    })
  }

  private messageFieldToDiscordField(field: Field): EmbedField {
    if (typeof field === 'string') {
      return { name: '\u200B', value: field, inline: false }
    }
    return { name: field.name, value: field.value, inline: field.inline || false }
  }

  // private replaceUserIdsWithTags(st: string): string {

  // }

  tagUser(userId: string){
    return `<@!${userId}>`
  }

}