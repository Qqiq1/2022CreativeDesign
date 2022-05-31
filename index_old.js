const Discord = require('discord.js')
const fs = require('fs')
const { Client, Intents } = require('discord.js')

const { prefix, token } = require('./config.json')

const client = new Client({ intents: [Intents.FLAGS.GUILDS] })
client.commands = new Discord.Collection()

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))

for (const file of commandFiles) {
	const command = require(`./commands/${file}`)
	client.commands.set(command.name, command)
	console.log(command)
}


client.once('ready', () => {
	console.log('Ready!')
})


client.on('message', function(message) {
	if (!message.content.startsWith(prefix) || message.author.bot) return
	if (message.author.id === client.user.id) return

	const args = message.content.slice(prefix.length).trim().split(/ +/)
	const command = args.shift()

	if (!client.commands.has(command)) return

	try {
		client.commands.get(command).execute(message, args);
	} catch (error) {
		console.error(error);
	}
})


client.login(token)