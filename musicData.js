const fs = require('fs')

let albums = []

module.exports.getAlbums = function() {
    return new Promise((resolve, reject) => {
        fs.readFile('./data/albums.json', 'utf-8', (err, data) => {
            if(err) {
                reject(err)
            } else {
                albums = JSON.parse(data)
                console.log(albums)

                resolve(albums)
            }
        })
    } )
}
