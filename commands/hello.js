module.exports = {
    name: "hello",
    description: "인사하기",
    execute(message) {
        message.channel.send(`${message.author}, 안녕하세요 JSHS_Discord_Bot 입니다.`)
    }
}