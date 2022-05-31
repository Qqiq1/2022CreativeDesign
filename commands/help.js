const Discord = require('discord.js')

module.exports = {
    name: "help",
    description: "도움말",
    execute(message) {
        const embed = new Discord.MessageEmbed()
        .addField("*attendance", "출석하기")
        .addField("*balance", "포인트확인")
        .addField("*hello", "인사하기")
        .addField("*play <link>", "노래듣기")
        .addField("*pause", "일시정지")
        .addField("*resume", "재생")
        .addField("*skip", "다음 노래 재생")
        .addField("*init", "큐 초기화")
        .addField("*add <title> <link>", "노래 링크 추가")
        .addField("*list <page>", "등록된 노래 확인")
        .addField("*del <index>", "대기 중인 노래 삭제")
        .addField("*scrim", "오대오모집")
        .setColor(0xFFB68F)

        message.channel.send(embed)
    }
}