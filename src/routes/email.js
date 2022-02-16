const controller = require('../controllers/email')

const routes = [
  {
    method: 'POST',
    url: '/api/email/send',
    handler: controller.send
  },
  {
    method: 'GET',
    url: '/api/email/history',
    handler: controller.history
  }
]

module.exports = routes