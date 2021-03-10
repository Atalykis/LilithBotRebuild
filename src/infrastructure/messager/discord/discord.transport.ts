import { Client as DiscordClient, DiscordAPIError, MessageEmbed } from 'discord.js'

import { ErrorMessageOut } from '../shared/message-out'
import { Transport } from '../shared/transport'
import { DiscordMessager } from './discord.messager'
import { DiscordCommand } from './discord.command'

export class DiscordTransport implements Transport {
  controllers: any[] = []

  constructor(private readonly client: DiscordClient, private readonly messager: DiscordMessager, private readonly token: string) {
    this.client.on('message', async (message) => {
      if(!DiscordCommand.isCommand(message)){
        return;
      }

      const command = new DiscordCommand(message)

      const handler = this.findHandler(command)
      if(!handler){
        await message.react('❓')
        await this.messager.sendDm(command.getUserId(), new ErrorMessageOut('Unknown command, try $help'))
        await message.delete({ timeout: 10000 })
        return
      } 

      try{
        const messageOut = await handler(command)
        await message.react('🟢')
        if(messageOut){
          await this.messager.sendOnChannel(command.getChannelId(), messageOut)
        }
        await message.delete({ timeout: 10000 })
        return;
      } catch(error){
        await message.react('🔴')
        await this.messager.sendDm(command.getUserId(), new ErrorMessageOut(error.message))
        await message.delete({ timeout: 10000 })
      }

      })
    }
 
  findHandler(command: DiscordCommand){
    for (const controller of this.controllers) {
      const handler = controller[command.getCommand()]
      // we find the appropriate handler
      if (handler) {
        return handler.bind(controller)
      }
    }
  }

  addController(controller: any) {
    this.controllers.push(controller)
  }

  async start(){
    await this.client.login(this.token)
    console.log('Discord bot logged in')
  }
}