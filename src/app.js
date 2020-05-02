'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
//const router = express.Router();
const mongoose = require('mongoose')
const config = require('./config')
//conecta ao banco
mongoose.connect(config.connectionString)

// carrega rotas
const indexRoute = require('./routers/index-route')
const productRoute = require('./routers/product-route')
const customerRoute = require('./routers/customer-route')
const orderRoute = require('./routers/order-route')

// carrega models
const Product = require('./models/product')
const Customer = require('./models/customer')
const Order = require('./models/order')

app.use(
  bodyParser.json({
    limit: '4mb',
  })
)

//habilita o  CORS
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, x-access-token'
  )
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  next()
})
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', indexRoute)
app.use('/products', productRoute)
app.use('/customers', customerRoute)
app.use('/orders', orderRoute)

module.exports = app
