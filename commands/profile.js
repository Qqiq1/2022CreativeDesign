const Discord = require('discord.js')

module.exports = {
    name: "profile",
    description: "프로필",
    execute(message) {
		const embed = new Discord.MessageEmbed()
		.setAuthor("JSHS_Discord_Bot", "https://pbs.twimg.com/media/E2HwwaQVkAQv9gy.jpg")
		.setColor(0xFFB68F)
		.setTitle("Github Link")
		.setURL("https://github.com/kakunge/Study/tree/main/JSHS_Discord_Bot")
		.setDescription("Jeju Science High School")
		.setThumbnail("http://jeju-s.jje.hs.kr/upload/logoImg/jeju-s/LogoImg_202007130501540020.jpg")
		.addFields(
			{name: "*help", value: "명령어확인"},
		)
		.setImage("https://pbs.twimg.com/media/E2HwwaQVkAQv9gy.jpg")
		.setFooter("Copyright 2021. kakunge all rights reserved.")

        message.channel.send(embed)
    }
}