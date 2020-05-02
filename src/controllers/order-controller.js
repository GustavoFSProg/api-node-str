'use strict'

const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const guid = require('guid')
const authService = require('../services/auth-service')
const Order = require('../models/order')
const ValidationContract = require('../validators/fluent-validator')
const repository = require('../repositorios/order-repository')

exports.get = async (req, res, next) => {
  try {
    var data = await repository.get()
    res.status(200).send(data)
  } catch (e) {
    res.status(500).send({
      message: 'Falha ao processar a requisição GET-order!',
    })
  }
}

exports.create = async (req, res, next) => {
  try {
    const token =
      req.body.token || req.query.token || req.headers['x-access-token']
    const data = await authService.decodeToken(token)

    await repository.create({
      customer: data.id,
      number: guid.raw().substring(0, 6),
      items: req.body.items,
    })
    res.status(201).send({ message: 'Pedido cadastrado com sucesso!' })
  } catch (e) {
    res.status(500).send({
      message: 'Falha ao processar a requisição POST-Pedido!',
    })
  }
}
