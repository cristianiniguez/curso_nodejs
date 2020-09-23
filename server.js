const express = require('express')
const app = express()
const server = require('http').Server(app)

const cors = require('cors')
const bodyParser = require('body-parser')
const socket = require('./socket')
const db = require('./db')
const { config } = require('./config/index')
const router = require('./network/routes')

const url = `mongodb://${config.dbUser}:${config.dbPassword}@${config.dbHost}/${config.dbName}?ssl=true&replicaSet=atlas-14jn7z-shard-0&authSource=admin&retryWrites=true&w=majority`
db(url)

app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

socket.connect(server)

router(app)

app.use('/app', express.static('public'))

server.listen(3000, function () {
  console.log('La aplicación está escuchando en http://localhost:3000')
})
