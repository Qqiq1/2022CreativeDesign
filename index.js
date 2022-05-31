const Discord = require('discord.js')
const fs = require('fs')
const { Client, Intents } = require('discord.js')
const ytdl = require('ytdl-core')

const { prefix, token } = require('./config.json')

const client = new Client({ intents: [Intents.FLAGS.GUILDS] })
client.commands = new Discord.Collection()

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))

const streamOptions = { seek: 0, volume: 1 }
const musics = require('./data/songs.json')
const { title } = require('process')

var queue = []
var nowPlaying = false

function Play(link, connection) {
	let stream

	if (nowPlaying) {
		queue.push(link)
	} 
	else {
		if (queue[0]) {
			stream = ytdl(`${queue[0]}`, { filter: 'audioonly', quality: 'highest' })
			queue.shift()
			dispatcher = connection.play(stream, streamOptions)
			dispatcher.on('start', () => {
				nowPlaying = true
				console.log('now playing', nowPlaying)
			})
			dispatcher.on('finish', () => {
				nowPlaying = false
				console.log('finished playing', nowPlaying)

				if (queue[0]) {
					Play(queue[0], connection)
				}
			})
		}
		else {
			stream = ytdl(`${link}`, { filter: 'audioonly', quality: 'highest' })
			dispatcher = connection.play(stream, streamOptions)
			dispatcher.on('start', () => {
				nowPlaying = true
				console.log('now playing', nowPlaying)
			})
			dispatcher.on('finish', () => {
				nowPlaying = false
				console.log('finished playing', nowPlaying)

				if (queue[0]) {
					Play(queue[0], connection)
				}
			})
		}
	}
	
}


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


{//음악 재생 기능 관련
	var titles = []
	if (message.content.startsWith(prefix+"play")) {
		for (let i = 0; i < musics.length; i++) {
			titles.push(musics[i].title)
		}

		tlink = message.content.substring(6,)
		
		if (titles.includes(tlink)) {
			link = musics[titles.indexOf(tlink)].link
		}
		else if (tlink.startsWith("https://www.youtube.com")) {
			link = tlink
		}
		else {
			message.channel.send("Wrong URL")
			return
		}

		const voiceChannel = message.member.voice.channel

        if (voiceChannel) {
            voiceChannel.join().then(connection => {
                Play(link, connection)
            })
        }
        else {
            message.reply("You need to be in the voice channel.")
        }
	}

	if (message.content === prefix+"pause") {
		if (message.member.voice.channel) {
			if (nowPlaying) {
				dispatcher.pause(true)
				nowPlaying = false
				message.channel.send("pause")
			}
			else {
				message.channel.send("Already paused.")
			}
		}
		else {
			message.channel.send("You need to be in the same voice channel.")
		}
	}

	if (message.content === prefix+"resume") {
		if (typeof(dispatcher) === 'undefined') {
			message.channel.send("Please play the song first.")
		}
		else if (message.member.voice.channel) {
			if (!nowPlaying) {
				dispatcher.resume()
				nowPlaying = true
				message.channel.send("resume")
			}
			else {
				message.channel.send("Now playing.")
			}
		}
		else {
			message.channel.send("You need to be in the same voice channel.")
		}
	}

	if (message.content === prefix+"skip") {
		if (typeof(dispatcher) === 'undefined') {
			message.channel.send("Please play the song first.")
		}
		else {
			message.reply("skip")
			dispatcher.destroy()
			nowPlaying = false

			const voiceChannel = message.member.voice.channel

			voiceChannel.join().then(connection => {
				Play(queue[0], connection)
			})
		}
	}

	if (message.content === prefix+"queue") {
		if (queue[0]) {
			message.channel.send(queue)
		}
		else {
			message.channel.send("Queue is empty.")
		}
	}

	if (message.content === prefix+"init") {
		if (typeof(dispatcher) === 'undefined') {
			message.channel.send("Please play the song first.")
		}
		else {
			dispatcher.destroy()
			queue = []
			nowPlaying = false
		}
	}
	
	if (message.content.startsWith(prefix+"del")) {
		index = parseInt(message.content.substring(4,))
		
		if (index - 1 < queue.length) {
			queue.splice(index - 1, 1)
			message.channel.send("Deleted from the queue.")
		}
		else {
			message.channel.send("Out of index.")
		}
	}
}

//외부 파일로 생성된 명령어
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