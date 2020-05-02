'use strict'
const jwt = require('jsonwebtoken')

exports.generateToken = async (data) => {
  return jwt.sign(data, global.SALT_KEY, { expiresIn: '1d' })
}

exports.decodeToken = async (token) => {
  var data = await jwt.verify(token, global.SALT_KEY)
  return data
}

exports.authorize = function (req, res, next) {
  var token = req.body.token || req.query.token || req.headers['x-access-token']

  if (!token) {
    res.status(401).json({
      message: 'Acesso Restrito',
    })
  } else {
    jwt.verify(token, global.SALT_KEY, function (error, decoded) {
      if (error) {
        res.status(401).json({
          message: 'Token Inválido!',
        })
      } else {
        next()
      }
    })
  }
}

exports.isAdmin = function (req, res, next) {
  var token = req.body.token || req.query.token || req.headers['x-access-token']

  if (!token) {
    res.status(401).json({
      message: 'Acesso Restrito',
    }) // res restrito
  } //if
  else {
    jwt.verify(token, global.SALT_KEY, function (error, decoded) {
      if (error) {
        res.status(401).json({
          message: 'Token Inválido!',
        }) //res status
      } //if error
      else {
        if (decoded.roles.includes('admin')) {
          next()
        } //if decodes
        else {
          res.status(403).send({
            message: 'Esta funcionalidade é restrita aos administradores',
          }) //res status
        } //else
      } //if maior
    })
  }
} //jwt
//else
