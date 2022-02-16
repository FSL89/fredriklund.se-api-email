const fs = require('fs')

const { history } = require("../models/history")
const { Op, fn, col } = require("sequelize")

//
//  Setup Nodemailer
//

const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
  sendmail: true,
  newline: 'unix',
  path: '/usr/sbin/sendmail',
  secure: true,
  dkim: {
    keys: [
      {
        domainName: 'fredriklund.se',
        keySelector: 'default', // default._publi
        privateKey: fs.readFileSync("private_key.pem") // Copied from OpenDKIM keys directory
      }
    ]
  },
  debug: true,
})

exports.send = async (request, reply) => {
  try {
    if (!request.body) throw await onError(400, 'Bad request', 'Missing request body')
    let info = await transporter.sendMail({
      from: request.body.from, // Can also be used with alias, such as '"Fredrik Lund" <email@fredriklund.se>'
      to: request.body.to, // Recipient, can be sent to multiple addresses using comma as separator
      subject: request.body.subject, // Subject
      text: request.body.text, // Text body
      html: request.body.html // HTML body
    })
    reply.send({
      message_id: info.messageId,
      envelope: info.envelope,
      from: request.body.from,
      to: request.body.to,
      subject: request.body.subject
    })
  }
  catch (error) {
    await reply.send(error)
  }
}