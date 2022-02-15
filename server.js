const fastify = require('fastify')({
  logger: true
})

const Mailer = require('nodemailer')

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

fastify.post('/email/send', async (request, reply) => {
  try {
    const body = request.body

    if (!body) throw await onError(400, 'Bad request', 'Missing request body')

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