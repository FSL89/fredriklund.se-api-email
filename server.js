require('dotenv').config({})

const fastify = require('fastify')({
  logger: true
})

//
//  Setup Nodemailer
//

const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
  sendmail: true,
  newline: 'unix',
  path: '/usr/bin/sendmail',
  secure: true,
  dkim: {
    domainName: 'fredriklund.se',
    keySelector: 'default',
    privateKey: process.env.DKIM_PRIVATE_KEY
  }
})

//
//  Functions
//

const onError = async (code, name, message) => {
  return {
    error: true,
    code: code,
    name: name,
    message: message
  }
}

//
//  Routes
//

fastify.get('/api/email', async (request, reply) => {
  try {
    return { 
      status: 'Running'
    }
  }
  catch (error) {
    return (error)
  }
})

// Won't work in local dev
fastify.post('/api/email/send', async (request, reply) => {
  try {
    console.log(request.body)
    if (!request.body) throw await onError(400, 'Bad request', 'Missing request body')
    console.log(request)
    let info = await transporter.sendMail({
      from: request.body.from, // Can also be used with alias, such as '"Fredrik Lund" <email@fredriklund.se>'
      to: request.body.to, // Recipient, can be sent to multiple addresses using comma as separator
      subject: request.body.subject, // Subject
      text: request.body.text, // Text body
      html: request.body.html // HTML body
    })
    reply.send({
      message_id: info.messageId,
      from: request.body.from,
      to: request.body.to,
      subject: request.body.subject
    })
  }
  catch (error) {
    await reply.send(error)
  }
})

const start = async () => {
  try {
    await fastify.listen(9000)
  }
  catch (error) {
    fastify.log.error(error)
    process.exit(1)
  }
}

start()