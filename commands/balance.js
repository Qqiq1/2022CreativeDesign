const fs = require('fs')

module.exports = {
    name: "balance",
    description: "잔액확인",
    execute(message) {
        const id = message.author.id
        const name = message.author.username

        const filePath = `./data/${id}.json`

        !fs.existsSync(filePath) ? fs.writeFileSync(filePath, JSON.stringify({})) : null

        const user = JSON.parse(fs.readFileSync(filePath, "utf-8"))

        user.id ? message.reply(`현재 잔액은 ${user.point}포인트입니다.`) : message.reply(`*attendance를 입력하여 등록해주세요.`)
    }
}