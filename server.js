require('dotenv').config({})

const fastify = require('fastify')({
  logger: true
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
//  Prehandler(s)
//



//
//  Routes
//

require('./src/routes/email').forEach( (route, index) => { fastify.route(route) })

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