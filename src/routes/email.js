const controller = require('../controllers/email')

const routes = [
  {
    method: 'POST',
    url: '/api/email/send',
    handler: controller.send
  }
]

module.exports = routes