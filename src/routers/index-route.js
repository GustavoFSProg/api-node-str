'use strict'

const express = require('express')
const router = express.Router()

//router.get('/', action)
router.get('/', (req, res, next) => {
  res.status(200).send({
    title: 'Node Store API',
    version: '1.0.0',
  })
})

// router.get('A', (req, res, next) => {
//   // aqui está meu script
// })

// function action(req, res, next) {
//   // aqui está meu script
// }

// let action = (req, res, next) => {
//   // aqui está meu script

//   res.status(200).send('hellwo Word')
// }

module.exports = router
