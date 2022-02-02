const express = require('express')
const app = express()

const path = require('path')
const musicData = require('./musicData')

const HTTP_PORT = process.env.port || 8080
const onHttpStart = () => console.log(`HTTP server is listening on port ${HTTP_PORT} 🚀🚀🚀`)

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.redirect('/home')
})

app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/index.html'))
})

app.get('/lyrics', (req, res) => {
    // res.send('hello lyrics')
    musicData.getAlbums().then((data) => {
        res.json(data)
    }).catch((error) => {
        console.log(error)
        res.status(404).send("ERROR!")
    })
})

app.get('/lyrics/:id', (req, res) => {
    // res.send('hello lyrics')
    musicData.getAlbums().then((data) => {
        // res.json(data)
        // res.send(req.params.id)
        // resolvedPromiseData[idFromRequestParams].field
        res.json(data[req.params.id-1].lyrics)

    }).catch((error) => {
        console.log(error)
        res.status(404).send("ERROR!")
    })
})


app.get('/about', (req, res) => {
    res.send('hello about')
})

app.get('/music', (req, res) => {
    res.send('hello music')
})

app.use((req, res) => {
    res.status(404).send("PAGE NOT FOUND!!")
})

app.listen(HTTP_PORT, onHttpStart)