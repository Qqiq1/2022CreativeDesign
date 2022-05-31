const Discord = require('discord.js')
const fs = require('fs')

module.exports = {
    name: "list",
    description: "등록된 노래 리스트",
    execute(message) {
        const musics = require('../data/songs.json')

        var titles = []

        for (let i = 0; i < musics.length; i++) {
			titles.push(musics[i].title)
		}

        const embed = new Discord.MessageEmbed()
        .setDescription(titles)
		.setColor(0xFFB68F)

        message.channel.send(embed)

    }
}