const express = require('express')
const bodyParser = require('body-parser')

const db = require('./db')
const { config } = require('./config/index')
const router = require('./network/routes')

const url = `mongodb://${config.dbUser}:${config.dbPassword}@${config.dbHost}/${config.dbName}?ssl=true&replicaSet=atlas-14jn7z-shard-0&authSource=admin&retryWrites=true&w=majority`
db(url)

var app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

router(app)

app.use('/app', express.static('public'))

app.listen(3000)

console.log('La aplicación está escuchando en http://localhost:3000')