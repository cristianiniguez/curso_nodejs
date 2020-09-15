const express = require('express')
const router = express.Router()

var app = express()

app.use(router)

router.get('/', function (req, res) {
  res.send('Hola desde get')
})

router.post('/', function (req, res) {
  res.send('Hola desde post')
})

router.get('/message', function (req, res) {
  res.send('Lista de mensajes')
})

router.post('/message', function (req, res) {
  res.send('Mensaje añadido')
})

router.delete('/message', function (req, res) {
  res.send('Mensaje eliminado')
})

app.listen(3000)

console.log('La aplicación está escuchando en http://localhost:3000')