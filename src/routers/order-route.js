'use strict'

const express = require('express')
const router = express.Router()
const controller = require('../controllers/order-controller')
const repos = require('../repositorios/order-repository')
const authService = require('../services/auth-service')

router.post('/post', authService.authorize, controller.create)
router.get('/', authService.authorize, controller.get)

module.exports = router
