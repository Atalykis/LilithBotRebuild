import * as Discord  from 'discord.js'
import AccountManager from './functions/account/accountManager'
import Account from './functions/account/account'
import Casino from './functions/casino/casino'
import CommandHandler from './functions/commandManager/commandHandler'

const bot :Discord.Client = new Discord.Client()
const token :string = "ODE1OTE3NDY3MjY4NDE1NTU4.YDzYWw.Asc2-nWUCSPhpdfa9FgBJrK3anE"
const casino = new Casino()
const commandHandler = new CommandHandler(casino);


bot.on('ready', function () {
  console.log("Je suis connecté !")
})

bot.login(token)


bot.on('message', message => {
  //console.log(message)
    if (!message.content.startsWith("§")) return;
    commandHandler.handleCommand(message); 
})

// const exampleEmbed = new Discord.MessageEmbed()
//   .setColor('#F7960A')
//   .setTitle('Double OR Nothing')
//   .setURL('https://discord.js.org/')
//   .setAuthor('Some name', 'https://imgur.com/a/BrcPLWu', 'https://discord.js.org')
//   .setDescription('Some description here')
//   .setThumbnail('https://imgur.com/a/BrcPLWu')
//   .addFields(
//     { name: 'Regular field title', value: 'Some value here' },
//     { name: '\u200B', value: '\u200B' },
//     { name: 'Inline field title', value: 'Some value here', inline: true },
//     { name: 'Inline field title', value: 'Some value here', inline: true },
//   )
//   .addField('Inline field title', 'Some value here', true)
//   .setImage('https://imgur.com/a/BrcPLWu')
//   .setTimestamp()
//   .setFooter('Some footer text here', 'https://imgur.com/a/BrcPLWu');
