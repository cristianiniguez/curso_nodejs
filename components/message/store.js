const { populate } = require('../user/model')
const Model = require('./model')

function addMessage(message) {
  const myMessage = new Model(message)
  myMessage.save()
}

function getMessage(filterUser) {
  return new Promise((resolve, reject) => {
    let filter = {}
    if (filterUser) {
      filter = { user: filterUser }
    }
    const messages = Model.find(filter)
      .populate('user')
      .exec((err, populated) => {
        if (err) {
          reject(err)
          return false
        }
        resolve(populated)
      })
  })
}

async function updateText(id, message) {
  const foundMessage = await Model.findOne({ _id: id })
  foundMessage.message = message
  const newMessage = await foundMessage.save()
  return newMessage
}

function removeMessage(id) {
  return Model.deleteOne({ _id: id })
}

module.exports = {
  add: addMessage,
  list: getMessage,
  updateText: updateText,
  remove: removeMessage
}