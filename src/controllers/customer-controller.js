'use strict'

const sendgrid = require('sendgrid')
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const config = require('../config')
const md5 = require('md5')
const emailServices = require('../services/email-services')
const authService = require('../services/auth-service')

const Customer = require('../models/customer')
const ValidationContract = require('../validators/fluent-validator')
const repository = require('../repositorios/customer-repository')

exports.get = async (req, res, next) => {
  try {
    var data = await repository.get()
    res.status(200).send(data)
  } catch (e) {
    res.status(500).send({
      message: 'Falha ao processar a requisição GET-customers!',
    })
  }
}

exports.create = async (req, res, next) => {
  // let contract = new ValidationContract()
  // contract.hasMinLen(req.body.name, 3, 'O name deve ter ao menos 3 caracteres')
  // contract.isEmail(req.body.email, 'O email é Inválido')
  // contract.hasMinLen(
  //   req.body.password,
  //   3,
  //   'O password deve ter ao menos 3 caracteres'
  // )

  //valida contract
  /*if (!contract.isValid()) {
    res
      .status(400)
      .send(contract.errors())
      .end()
  }*/
  try {
    await repository.create({
      name: req.body.name,
      email: req.body.email,
      password: md5(req.body.password + process.env.SALT_KEY),
      roles: req.body.roles,
    })

    await emailServices.send(
      req.body.email,
      'Bem vindo ao Node Store',
      req.body.name
    )

    res.status(201).send({ message: 'Clinte cadastrado com sucesso!' })
  } catch (e) {
    res.status(500).send({
      message: 'Falha ao processar a requisição POST!',
    })
  }
}

exports.authenticate = async (req, res, next) => {
  try {
    const customer = await repository.authenticate({
      email: req.body.email,
      password: md5(req.body.password + global.SALT_KEY),
    })

    if (!customer) {
      res.status(404).send({
        message: 'Usuario ou senha inválidos',
      })
      return
    }

    const token = await authService.generateToken({
      id: customer._id,
      email: customer.email,
      name: customer.name,
      roles: customer.roles,
    })
    res.status(201).send({
      token: token,
      data: {
        email: customer.email,
        name: customer.name,
        // roles: customer.roles,
      },
    })
  } catch (e) {
    res.status(500).send({
      message: 'Falha ao processar a requisição POST!',
    })
  }
}

exports.refreshToken = async (req, res, next) => {
  try {
    const token =
      req.body.token || req.query.token || req.headers['x-access-token']
    const data = await authService.decodeToken(token)

    const customer = await repository.getById(data.id)

    if (!customer) {
      res.status(404).send({
        message: 'Cliente não encontrado.',
      })
      return
    }

    const tokenData = await authService.generateToken({
      id: customer._id,
      email: customer.email,
      name: customer.name,
      roles: customer.roles,
    })
    res.status(201).send({
      token: tokenData,
      data: {
        email: customer.email,
        name: customer.name,
      },
    })
  } catch (e) {
    res.status(500).send({
      message: 'Falha ao processar a requisição POST!',
    })
  }
}

exports.delete = async (req, res, next) => {
  try {
    var data = await repository.delete(req.params.id)
    res.status(200).send({ message: 'Customer Removido Com sucesso!' })
  } catch (e) {
    res.status(500).send({
      message: 'Falha ao ao remover!!!',
    })
  }
}
