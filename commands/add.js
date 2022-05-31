const fs = require('fs')

module.exports = {
    name: "add",
    description: "노래 추가하기",
    execute(message) {
        const musics = require('../data/songs.json')
        const filePath = './data/songs.json'

        header = 'https://www.youtube.com'
        index = message.content.indexOf(header)

        const title = message.content.substring(5, index).trim()

        var titles = []

        for (let i = 0; i < musics.length; i++) {
			titles.push(musics[i].title)
		}

        if (index == -1) {
            message.channel.send('Wrong URL.')
        }
        else if (titles.indexOf(title) != -1) {
            message.channel.send('The song has already been registered.')
        }
        else {
            const link = message.content.substring(index, )

            song = {
                title: title,
                link: link
            }

            musics.push(song)
            fs.writeFileSync(filePath, JSON.stringify(musics))
            message.channel.send('Song added.')
        }
    }
}