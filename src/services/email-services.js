'use strict'
const config = require('../config')
const sendgrid = require('sendgrid')(process.env.SENDGRID_API_KEY)

exports.send = async (to, subject, body) => {
  await sendgrid.send({
    to: to,
    from: 'helhow@gmail.com',
    subject: subject,
    html: body,
  })
}
