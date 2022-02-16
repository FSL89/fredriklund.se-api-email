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
//  Fastify Hook(s)
//
fastify.addHook('preValidation', async (request, reply) => {
  try {
    fastify.log.info('TODO: Add security checks here. We do not want unauthorized access')
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