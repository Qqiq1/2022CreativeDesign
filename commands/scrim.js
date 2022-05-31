const Discord = require('discord.js')

module.exports = {
    name: "scrim",
    description: "오대오모집",
    execute(message) {
		const embed = new Discord.MessageEmbed()
		.setTitle("오대오 참가신청")
		.setDescription("참가는 🍏, 불참은 🍎를 눌러주세요.")
		.setColor(0xFFB68F)

		message.channel.send(embed)
            .then((msg) => {
                msg.react("🍏")
                msg.react("🍎")
            })
    }
}