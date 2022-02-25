require('dotenv').config({})

const fastify = require('fastify')({
  logger: true
})

const start = async () => {
  try {
    fastify.log.info('Start up the server...')
    await fastify.listen(9000)
  }
  catch (error) {
    fastify.log.error(error)
    process.exit(1)
  }
}

const axios = require('axios')

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
//  Global Fastify Hook(s)
//

fastify.addHook('preValidation', async (request, reply) => {
  try {

    // 1. Check if incoming request include API key
    if (request.headers['x-api-key']) {
      reply.code(400).send({
        error: true,
        type: 'Bad Request',
        message: 'Missing API key'
      })
    }

    // 2. Verify the API key
    

  }
  catch (error) {
    fastify.log.error(error)
  }
})

//
//  Routes
//

require('./src/routes/email').forEach( (route, index) => { fastify.route(route) })

start()