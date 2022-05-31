const fs = require('fs')

module.exports = {
    name: "attendance",
    description: "출석하기",
    execute(message) {
        const id = message.author.id
        const name = message.author.username

        const filePath = `./data/${id}.json`

        !fs.existsSync(filePath) ? fs.writeFileSync(filePath, JSON.stringify({})) : null

        const user = JSON.parse(fs.readFileSync(filePath, "utf-8"))

        const today = new Date()
        const date = "" + today.getFullYear() + today.getMonth() + today.getDate()

        const attendancePoint = 5000


        let saveUser = {}
        if (user.id) {
            if(user.date === date) {
                saveUser = user
                
                message.reply(`출석 포인트 지급은 하루에 한 번만 가능합니다.`)
            }
            else {
                saveUser = {
                    id : id,
                    name : name,
                    date : date,
                    point : user.point + attendancePoint,
                }
                
                message.reply(`${attendancePoint}포인트가 지급되었습니다.\n현재 잔액은 ${user.point + attendancePoint}포인트입니다.`)
            }
        }
        else {
            saveUser = {id, name, date, attendancePoint : attendancePoint}

            message.reply(`환영합니다 !`)
        }
    
    fs.writeFileSync(filePath, JSON.stringify(saveUser))
    }
}