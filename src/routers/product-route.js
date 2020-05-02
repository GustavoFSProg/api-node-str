'use strict'

const express = require('express')
const router = express.Router()
const controller = require('../controllers/product-controller')
const authService = require('../services/auth-service')

router.get('/admin/:slug', controller.getBySlug)
router.get('/rotulo/:tag', controller.getByTag)
router.get('/', controller.get)
router.get('/:id', controller.getById)
router.put('/up/:id', authService.isAdmin, controller.put)
router.post('/post', authService.isAdmin, controller.create)
router.delete('/del/:id',authService.isAdmin,  controller.delete)

module.exports = router
