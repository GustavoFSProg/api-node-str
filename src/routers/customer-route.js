'use strict'

const express = require('express')
const router = express.Router()
const controller = require('../controllers/customer-controller')
const repos = require('../repositorios/product-repository')
const authService = require('../services/auth-service')

router.post('/post', controller.create)
router.post('/authenticate', controller.authenticate)
router.get('/', controller.get)
router.delete('/del/:id', controller.delete)
router.post('/refresh-token', authService.authorize, controller.refreshToken)

module.exports = router
