const env = require('dotenv')
env.config()

let albums = []

const Sequelize = require('sequelize');

var sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    port: 5432,
    dialectOptions: {
        ssl: { rejectUnauthorized: false }
    },
    query: { raw: true }
});

var Album = sequelize.define('Album', {
    albumID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true 
    },
    title: Sequelize.STRING,
    year: Sequelize.INTEGER,
    artist: Sequelize.STRING,
    imagePath: Sequelize.STRING
})

var Song = sequelize.define('Song', {
    songID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true 
    },
    title: Sequelize.STRING,
    musicPath: Sequelize.STRING,
    lyrics: Sequelize.STRING
})

// Album.hasMany(Song, {foreignKey: 'albumID'})
Song.belongsTo(Album, {foreignKey: 'albumID'})

module.exports.initialize = function() {
    return new Promise((resolve, reject) => {
        sequelize.sync().then(() => {
            resolve()
        }).catch((error) => {
            console.log(error)
            reject("SYNC FAILED")
        })
    })}


module.exports.getAlbums = function() {
    return new Promise((resolve, reject) => {
        Album.findAll().then((data) => {
            resolve(data)
        })
        .catch((error) => {
            console.log(error)
            reject()
        })
    })
}


module.exports.addAlbum = function(album) {
    return new Promise((resolve, reject) => {
        Album.create(album).then(() => {
            console.log("ALBUM CREATED")
    
        //     Song.create({
        //         title: "Paranoid",
        //         musicPath: "/music/paranoid_kanye.mp3",
        //         lyrics: "Why are you so paranoid",
        //         albumID: album.albumID
        //     })
        //   }).then(() => console.log("SONG CREATED"))

            resolve()

        }).catch((error) => {
            console.log("ALBUM ERROR:")
            console.log(error)
            reject()
        })

        // album.id = albums.length + 1
        // albums.push(album)
        // resolve()
    })
}

module.exports.addSong = function(song) {
    return new Promise((resolve, reject) => {
        Song.create(song).then(() => {
            console.log("SONG CREATED")
    
        //     Song.create({
        //         title: "Paranoid",
        //         musicPath: "/music/paranoid_kanye.mp3",
        //         lyrics: "Why are you so paranoid",
        //         albumID: album.albumID
        //     })
        //   }).then(() => console.log("SONG CREATED"))

            resolve()

        }).catch((error) => {
            console.log("SONG ERROR:")
            console.log(error)
            reject()
        })

        // album.id = albums.length + 1
        // albums.push(album)
        // resolve()
    })
}

module.exports.deleteAlbum = function(albumID) {
    return new Promise((resolve, reject) => {
        Album.destroy({
            where: {
                albumID: albumID
            }
        }).then(() => {
            console.log("ALBUM DELETED")
    
        //     Song.create({
        //         title: "Paranoid",
        //         musicPath: "/music/paranoid_kanye.mp3",
        //         lyrics: "Why are you so paranoid",
        //         albumID: album.albumID
        //     })
        //   }).then(() => console.log("SONG CREATED"))

            resolve()

        }).catch((error) => {
            console.log("ALBUM DELETE ERROR:")
            console.log(error)
        })

        // album.id = albums.length + 1
        // albums.push(album)
        // resolve()
    })
}