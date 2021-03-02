import { Client as DiscordClient } from 'discord.js'

import { Controller } from '../../../shared/controller'
import { Transport } from '../../../shared/transport'
import { DiscordIntent } from './discord.intent'

export class DiscordTransport implements Transport {
  controllers: Controller[] = []
  client: DiscordClient = new DiscordClient()

  constructor(private readonly token: string) {
    this.client.on('message', (message) => {
      try {
        // we encapsulate the way we communicate with discord here
        const intent = new DiscordIntent(message)
        
        const command = intent.getCommand()
        
        // we look in every registered controllers
        for (const controller of this.controllers) {
          console.log((controller as any)[command])
          
          // we find the appropriate handler
          if ((controller as any)[command]) {
            // we try to execute our handler
            try {
              return  (controller as any)[command](intent);
            } catch (error) {
              // if execution of handler throws, we just return from this function
              console.error('DiscordTransport : ', error);
              intent.reply(error.message);
              return;
            }
          }
        }
        
        // if the loop completes, it means there is no handler for this command      
        intent.reply('command not found')
      } catch (error) {
        return;
        // not a command do nothing
      }
      })
    }

  addController(controller: Controller) {
    this.controllers.push(controller)
  }

  async start(){
    await this.client.login(this.token)
  }
}