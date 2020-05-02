'use strict'

const app = require('../src/app')
const http = require('http')
const debug = require('debug')('nodestr:server')
const express = require('express')
const bodyparser = require('body-parser')

const port = normalizePort(process.env.PORT || '3001')

const server = http.createServer(app)
const router = express.Router()

const inter = 0

server.listen(port)
server.on('error', onError)
server.on('listening', onListening)

console.log('API rodando ' + port)

function normalizePort(val) {
  const port = parseInt(val, 10)

  if (isNaN(port)) {
    return val
  }

  if (port >= 0) {
    return port
  }

  return false
}

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error
  }

  const bind = typeof port === 'string' ? 'Pipe' + port : 'Port' + port

  switch (error.code) {
    case 'EACCES':
      console.erros(bind + 'requires elevated privileges')
      process.exit(1)

      break

    case 'EADDRIINUSE':
      console.erros(bind + 'is alredy in use')
      process.exit(1)

      break

    default:
      return error
  }
}

function onListening() {
  const addr = server.address()
  const bind = typeof addr === 'string' ? 'pipe' + addr : 'port' + addr.port

  debug('Lintening on' + bind)
}
