const Discord = require('discord.js')

module.exports = {
    name: "help",
    description: "도움말",
    execute(message) {
        const embed = new Discord.MessageEmbed()
        .addField("*play <link>", "노래듣기")
        .addField("*skip", "다음 노래 재생")
        .addField("*init", "큐 초기화")
        .addField("*add <title> <link>", "노래 링크 추가")
        .addField("*list <page>", "등록된 노래 확인")
        .setColor(0xFFB68F)

        message.channel.send(embed)
    }
}