require('dotenv').config({})

const fastify = require('fastify')({
  logger: true
})

//
//  Setup Nodemailer
//

const Mailer = require('nodemailer')

let transporter = Mailer.createTransport({
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

fastify.get('/', async (request, reply) => {
  try {
    return { 
      status: 'Running'
    }
  }
  catch (error) {
    return (error)
  }
})

fastify.post('/send', async (request, reply) => {
  try {
    console.log(request.body)
    if (!request.body) throw await onError(400, 'Bad request', 'Missing request body')
    console.log(request)
    //transporter.sendMail({
    //  to: 'fredrik.lund89@gmail.com',
    //  from: 'noreply@fredriklund.se',
    //  subject: 'Testing mail function with Nodemailer',
    //  text: 'This is my message in text',
    //  html: '<h1>Hi</h1><br /><p>This is my message in HTML</p>'
    //})
    reply.send({
      foo: 'bar'
    })
  }
  catch (error) {
    await reply.code(error.code || 500).send(error)
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