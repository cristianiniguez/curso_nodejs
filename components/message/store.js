const db = require('mongoose')
const Model = require('./model')
const { config } = require('../../config/index')

const uri = `mongodb://${config.dbUser}:${config.dbPassword}@${config.dbHost}/${config.dbName}?ssl=true&replicaSet=atlas-14jn7z-shard-0&authSource=admin&retryWrites=true&w=majority`

db.Promise = global.Promise

db.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })

console.log('[db] Conectada con éxito')

function addMessage(message) {
  const myMessage = new Model(message)
  myMessage.save()
}

async function getMessage() {
  const messages = await Model.find()
  return messages
}

async function updateText(id, message) {
  const foundMessage = await Model.findOne({ _id: id })
  foundMessage.message = message
  const newMessage = await foundMessage.save()
  return newMessage
}

module.exports = {
  add: addMessage,
  list: getMessage,
  updateText: updateText
  // get
  // update
  // delete
}